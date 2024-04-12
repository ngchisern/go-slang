import { GoroutineState } from '../goroutine'
import { VMState } from '../vm'
import { Memory, word_size } from './memory'

export class SingleMemory extends Memory {
  private freeIndex: number

  constructor() {
    super()
    this.freeIndex = 0

    super.initialize()
  }

  mem_make(bytes: number): void {
    if (bytes % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    const data = new ArrayBuffer(bytes)
    const view = new DataView(data)
    this.dataView = view
  }

  set_memory(data: ArrayBuffer): void {
    if (data.byteLength % word_size !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    this.dataView = new DataView(data)
  }

  free(): number {
    return this.freeIndex
  }

  increase_free(size: number): number {
    const old = this.freeIndex
    this.freeIndex += size
    return old
  }

  setUint8(address: number, value: number): void {
    this.dataView.setUint8(address, value)
  }

  setUint16(address: number, value: number): void {
    this.dataView.setUint16(address, value)
  }

  setUint64(address: number, value: number): void {
    this.dataView.setBigUint64(address, BigInt(value)) // TODO: check if this is correct
  }

  getUint8(address: number): number {
    return this.dataView.getUint8(address)
  }

  getUint16(address: number): number {
    return this.dataView.getUint16(address)
  }

  getUint64(address: number): number {
    return Number(this.dataView.getBigUint64(address)) // TODO: check if this is correct
  }

  lock(state: VMState): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_Mutex(address)) {
      console.error('not a mutex')
    }

    const locked = this.mem_get(address + 1)
    if (locked === 1) {
      // handle state where mutex is already locked
      state.PC--
      state.state = GoroutineState.BLOCKED
      return -1
    }

    this.mem_set(address + 1, 1)
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

    const locked = this.mem_get(address + 1)
    const owner = this.mem_get(address + 2)

    if (locked === 0 || owner !== state.currentThread) {
      throw new Error('sync: unlock of unlocked mutex')
    }

    this.mem_set(address + 1, 0)
    state.OS.pop()
    return address
  }

  wg_add(state: VMState): number {
    const address = state.OS[state.OS.length - 3]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    const count = this.mem_get(address + 1)
    const additional = this.address_to_JS_value(state.OS.pop())

    this.mem_set(address + 1, count + additional)

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

    const count = this.mem_get(address + 1)
    this.mem_set(address + 1, count - 1)

    state.OS.pop()
    return address
  }
}
