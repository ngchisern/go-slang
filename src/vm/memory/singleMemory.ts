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

  channel_send(state: VMState): void {
    const in_addr = state.OS.pop()
    const chan_addr = state.OS.pop()

    if (!this.is_Channel(chan_addr)) {
      console.error('send: not a channel')
      return
    }

    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5 // 5 config values
      const count = this.mem_get(chan_addr + 2)

      if (count >= buffer_size) {
        state.PC--
        state.state = GoroutineState.BLOCKED

        state.OS.push(chan_addr)
        state.OS.push(in_addr)

        return
      }

      const slotOut = this.mem_get(chan_addr + 3)
      const slotIn = (slotOut + count) % buffer_size

      this.mem_set(chan_addr + 2, count + 1)
      this.mem_set_child(chan_addr, 4 + slotIn, in_addr)

      state.OS.pop()
    } else {
      // unbuffered channel
      const hasData = this.mem_get_child(chan_addr, 1)
      const sender = this.mem_get_child(chan_addr, 2)

      if (sender === state.currentThread && this.is_False(hasData)) {
        this.mem_set_child(chan_addr, 2, 0)
        return
      }

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
      const buffer_size = this.mem_get_size(chan_addr) - 5
      const count = this.mem_get(chan_addr + 2)

      if (count === 0) {
        state.PC--
        state.state = GoroutineState.BLOCKED
        return -1
      }

      const slotOut = this.mem_get(chan_addr + 3)
      const addr = this.mem_get_child(chan_addr, 4 + slotOut)

      this.mem_set(chan_addr + 2, count - 1)
      this.mem_set(chan_addr + 3, (slotOut + 1) % buffer_size)

      return addr
    } else {
      const hasData = this.mem_get_child(chan_addr, 1)
      if (this.is_False(hasData)) {
        state.PC--
        state.state = GoroutineState.BLOCKED
        return -1
      }

      const addr = this.mem_get_child(chan_addr, 3)
      this.mem_set_child(chan_addr, 1, this.False)

      return addr
    }
  }
}
