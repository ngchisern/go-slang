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

  channel_send(state: VMState): void {
    const in_addr = state.OS.pop()
    const chan_addr = state.OS.pop()

    if (!this.is_Channel(chan_addr)) {
      console.error('send: not a channel')
      return
    }

    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5 // 5 config values

      let old_count = this.mem_get(chan_addr + 2)
      let new_count = old_count + 1

      while (true) {
        if (old_count >= buffer_size) {
          state.PC--
          state.state = GoroutineState.BLOCKED

          state.OS.push(chan_addr)
          state.OS.push(in_addr)

          return
        }

        const count = this.atomic_compare_exchange_mem_64(chan_addr + 2, old_count, new_count)
        if (count === old_count) {
          break
        }

        old_count = count
        new_count = old_count + 1
      }

      // attmempting to acquire the lock on the channel
      const lockAddr = chan_addr + 4
      while (this.atomic_compare_exchange_mem_64(lockAddr, 0, 1) === 1) {}

      const slotOut = this.mem_get(chan_addr + 3)
      const slotIn = (slotOut + old_count) % buffer_size

      this.mem_set_child(chan_addr, 4 + slotIn, in_addr)

      // release the lock
      this.atomic_sub_mem_64(lockAddr, 1)
      state.OS.pop()
    } else {
      // unbuffered channel
      let sender = this.mem_get_child(chan_addr, 2)
      const hasData = this.mem_get_child(chan_addr, 1)

      if (sender === state.currentThread && this.is_False(hasData)) {
        this.mem_set_child(chan_addr, 2, 0)
        return
      }

      sender = this.atomic_compare_exchange_mem_64(chan_addr + 3, 0, state.currentThread)

      if (sender === 0) {
        // no sender
        this.mem_set_child(chan_addr, 1, this.True)
        this.mem_set_child(chan_addr, 2, state.currentThread)
        this.mem_set_child(chan_addr, 3, in_addr)
      }

      state.PC--
      state.state = GoroutineState.BLOCKED

      state.OS.push(chan_addr)
      state.OS.push(in_addr)
    }
  }

  channel_receive(chan_addr: number, state: VMState): number {
    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5 // 5 config values

      let old_count = this.mem_get(chan_addr + 2)
      let new_count = old_count - 1

      while (true) {
        if (old_count === 0) {
          state.PC--
          state.state = GoroutineState.BLOCKED
          return -1
        }

        const count = this.atomic_compare_exchange_mem_64(chan_addr + 2, old_count, new_count)
        if (count === old_count) {
          break
        }

        old_count = count
        new_count = old_count + 1
      }

      // attmempting to acquire the lock on the channel
      const lockAddr = chan_addr + 4
      while (this.atomic_compare_exchange_mem_64(lockAddr, 0, 1) === 1) {}

      const slotOut = this.mem_get(chan_addr + 3)
      const addr = this.mem_get_child(chan_addr, 4 + slotOut)

      this.mem_set(chan_addr + 3, (slotOut + 1) % buffer_size)

      // release the lock
      this.atomic_sub_mem_64(lockAddr, 1)

      return addr
    } else {
      const addr = this.mem_get_child(chan_addr, 3)
      const stillHasData = this.atomic_compare_exchange_mem_64(chan_addr + 2, this.True, this.False)

      if (this.is_False(stillHasData)) {
        state.PC--
        state.state = GoroutineState.BLOCKED
        return -1
      }

      return addr
    }
  }

  atomic_compare_exchange_mem_64(address: number, expected: number, desired: number): number {
    address = address * word_size
    return Number(
      Atomics.compareExchange(
        new BigUint64Array(this.data, address, 1),
        0,
        BigInt(expected),
        BigInt(desired)
      )
    )
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
