import { GoroutineState } from '../goroutine'
import { VMState } from '../vm'
import { Memory, MemoryState, word_size } from './memory'

export class SharedMemory extends Memory {
  data: SharedArrayBuffer
  free_data: SharedArrayBuffer

  constructor(state?: MemoryState) {
    super(state)

    if (state) {
      this.data = state.data as SharedArrayBuffer
      if (state.free_data) {
        this.free_data = state.free_data as SharedArrayBuffer
      }
    } else {
      this.free_data = new SharedArrayBuffer(4)
      Atomics.store(new Uint32Array(this.free_data), 0, 0)
    }

    if (!state) {
      this.initialize()
    }
  }

  memory_state = (): MemoryState => {
    const super_state = super.base_state()
    super_state.free_data = this.free_data

    return super_state
  }

  mem_make(bytes: number): void {
    if (bytes % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    const data = new SharedArrayBuffer(bytes)
    const view = new DataView(data)
    this.data = data
    this.dataView = view
  }

  set_memory(data: SharedArrayBuffer): void {
    if (data.byteLength % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    this.data = data
    this.dataView = new DataView(data)
  }

  free(): number {
    return Atomics.load(new Uint32Array(this.free_data), 0)
  }

  increase_free(size: number): number {
    return Atomics.add(new Uint32Array(this.free_data), 0, size)
  }

  setUint8(address: number, value: number): void {
    Atomics.store(new Uint8Array(this.data, address, 1), 0, value)
  }

  setUint16(address: number, value: number): void {
    Atomics.store(new Uint16Array(this.data, address, 1), 0, value)
  }

  setUint64(address: number, value: number): void {
    Atomics.store(new BigUint64Array(this.data, address, 1), 0, BigInt(value))
  }

  getUint8(address: number): number {
    return Atomics.load(new Uint8Array(this.data, address, 1), 0)
  }

  getUint16(address: number): number {
    return Atomics.load(new Uint16Array(this.data, address, 1), 0)
  }

  getUint64(address: number): number {
    return Number(Atomics.load(new BigUint64Array(this.data, address, 1), 0))
  }

  lock(state: VMState): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_Mutex(address)) {
      console.error('not a mutex')
    }

    const locked = this.atomic_compare_exchange_mem_64(address + 1, 0, 1)
    if (locked === 1) {
      // handle state where mutex is already locked
      state.PC--
      state.state = GoroutineState.BLOCKED
      return -1
    }

    this.mem_set(address + 2, state.currentThread as number)

    state.OS.pop() // pop the fun; apply builtin will pop the method name
    return address
  }

  unlock(state: VMState): number {
    // pop the second last element
    const address = state.OS[state.OS.length - 2]

    if (!this.is_Mutex(address)) {
      throw new Error('not a mutex')
    }

    const locked = this.atomic_compare_exchange_mem_64(address + 1, 1, 0)
    const owner = this.mem_get(address + 2)

    if (locked === 0 || owner !== state.currentThread) {
      throw new Error('sync: unlock of unlocked mutex')
    }

    state.OS.pop()
    return address
  }

  wg_add(state: VMState): number {
    const address = state.OS[state.OS.length - 3]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    const additional = this.address_to_JS_value(state.OS.pop())
    this.atomic_add_mem_64(address + 1, additional)

    state.OS.pop()
    return address
  }

  wg_wait(state: VMState): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    const count = this.mem_get(address + 1)
    if (count !== 0) {
      state.PC--
      state.state = GoroutineState.BLOCKED
      return -1
    }

    state.OS.pop()
    return address
  }

  wg_done(state: VMState): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }
    
    this.atomic_sub_mem_64(address + 1, 1)

    state.OS.pop()
    return address
  }

  atomic_compare_exchange_mem_64(address: number, expected: number, desired: number): number {
    address = address * word_size
    return Number(Atomics.compareExchange(new BigUint64Array(this.data, address, 1), 0, BigInt(expected), BigInt(desired)))
  }

  atomic_add_mem_64(address: number, value: number): number {
    address = address * word_size
    return Number(Atomics.add(new BigUint64Array(this.data, address, 1), 0, BigInt(value)))
  }

  atomic_sub_mem_64(address: number, value: number): number {
    address = address * word_size
    return Number(Atomics.sub(new BigUint64Array(this.data, address, 1), 0, BigInt(value)))
  }
}
