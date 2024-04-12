import { escape } from 'querystring'
import { Ldc } from '../../common/instruction'
import { GoTag } from '../../common/types'
import { Goroutine, GoroutineState } from '../goroutine'
import { GoBlockSingle, GoChannelBuffer, IGoBlockBehavior } from '../types'
import { recvq, sendq } from '../utils'
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

  lock(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_Mutex(address)) {
      console.error('not a mutex')
    }

    const locked = this.mem_get(address + 1)
    if (locked === 1) {
      // NO NEED TO DECREMENT PC
      this.handle_lock(state, address, goBlockBehavior as GoBlockSingle)
      state.state = GoroutineState.BLOCKED
    } else {
      this.mem_set(address + 1, 1)
      this.mem_set(address + 2, state.currentThread as number)
    }

    state.OS.pop() // pop the fun; apply builtin will pop the method name
    return address
  }

  unlock(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
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

    const waiting = this.handle_unlock(address, goBlockBehavior as GoBlockSingle)

    if (waiting) {
      this.mem_set(address + 2, waiting.id)
    } else {
      this.mem_set(address + 1, 0)
    }

    state.OS.pop()
    return address
  }

  wg_add(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
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

  wg_wait(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    const count = this.mem_get(address + 1)
    if (count !== 0) {
      this.handle_lock(state, address, goBlockBehavior as GoBlockSingle)
      state.state = GoroutineState.BLOCKED
    }

    state.OS.pop()
    return address
  }

  wg_done(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    const count = this.mem_get(address + 1)
    this.mem_set(address + 1, count - 1)

    if (count === 1) {
      this.handle_unlock_all(address, goBlockBehavior as GoBlockSingle)
    }

    state.OS.pop()
    return address
  }

  channel_send(state: VMState, goBlockBehavior: IGoBlockBehavior): void {
    const in_addr = state.OS.pop()
    const chan_addr = state.OS.pop()

    if (!this.is_Channel(chan_addr)) {
      console.error('send: not a channel')
      return
    }

    // reserve a memory location for the value
    const val = this.address_to_JS_value(in_addr)
    const val_addr = this.JS_value_to_address({ tag: GoTag.Int, val })

    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5 // 5 config values
      const count = this.mem_get(chan_addr + 2)

      if (count >= buffer_size) {
        state.state = GoroutineState.BLOCKED
        const hash = chan_addr + sendq

        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockSingle)
      } else {
        const receiver = this.pop_chan_recv(chan_addr, goBlockBehavior as GoBlockSingle)
        if (count === 0 && receiver) {
          const addr = receiver.addr
          this.mem_set(addr + 1, this.mem_get(val_addr + 1))
        } else {
          const slotOut = this.mem_get(chan_addr + 3)
          const slotIn = (slotOut + count) % buffer_size

          this.mem_set(chan_addr + 2, count + 1)
          this.mem_set_child(chan_addr, 4 + slotIn, val_addr)
        }
      }

      state.OS.pop()
    } else {
      // unbuffered channel
      const receiver = this.pop_chan_recv(chan_addr, goBlockBehavior as GoBlockSingle)

      if (receiver) {
        const addr = receiver.addr
        this.mem_set(addr + 1, this.mem_get(val_addr + 1))
      } else {
        const hash = chan_addr + sendq
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockSingle)
        state.state = GoroutineState.BLOCKED
      }

      state.OS.pop()
    }
  }

  channel_receive(chan_addr: number, state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    // reserve memory location for the dummy value (only integer supproted now)
    const val_addr = this.JS_value_to_address({ tag: GoTag.Int, val: 0 })

    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5
      const count = this.mem_get(chan_addr + 2)

      if (count === 0) {
        const hash = chan_addr + recvq
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockSingle)
        state.state = GoroutineState.BLOCKED
        return val_addr
      }

      const slotOut = this.mem_get(chan_addr + 3)
      const addr = this.mem_get_child(chan_addr, 4 + slotOut)

      // copy to dummy location
      this.mem_set(val_addr + 1, this.mem_get(addr + 1))

      const sender = this.pop_chan_send(chan_addr, goBlockBehavior as GoBlockSingle)
      if (count === buffer_size && sender) {
        const saddr = sender.addr
        this.mem_set(chan_addr + 4 + slotOut, this.mem_get(saddr + 1))
      } else {
        this.mem_set(chan_addr + 2, count - 1)
      }

      this.mem_set(chan_addr + 3, (slotOut + 1) % buffer_size)
      return val_addr
    } else {
      const sender = this.pop_chan_send(chan_addr, goBlockBehavior as GoBlockSingle)

      if (sender) {
        const addr = sender.addr
        this.mem_set(val_addr + 1, this.mem_get(addr + 1))
      } else {
        const hash = chan_addr + recvq
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockSingle)
        state.state = GoroutineState.BLOCKED
      }

      return val_addr
    }
  }

  handle_lock = (state: VMState, addr: number, goBlockBehavior: GoBlockSingle) => {
    const scheduler = goBlockBehavior.scheduler
    scheduler.add_blocked(
      addr,
      new Goroutine(state.currentThread as number, state.currentThreadName, state)
    )
  }

  handle_unlock = (addr: number, goBlockBehavior: GoBlockSingle): Goroutine | undefined => {
    const scheduler = goBlockBehavior.scheduler
    return scheduler.remove_blocked(addr)
  }

  handle_unlock_all = (addr: number, goBlockBehavior: GoBlockSingle): boolean => {
    const scheduler = goBlockBehavior.scheduler
    return scheduler.remove_blocked_all(addr)
  }

  handle_chan_lock = (
    state: VMState,
    addr: number,
    valueAddr: number,
    goBlockBehavior: GoBlockSingle
  ) => {
    const scheduler = goBlockBehavior.scheduler
    scheduler.add_channel_blocked(
      addr,
      new Goroutine(state.currentThread as number, state.currentThreadName, state),
      valueAddr
    )
  }

  handle_chan_unlock = (
    addr: number,
    goBlockBehavior: GoBlockSingle
  ): GoChannelBuffer | undefined => {
    const scheduler = goBlockBehavior.scheduler
    return scheduler.remove_channel_blocked(addr)
  }

  pop_chan_send = (
    chan_addr: number,
    goBlockBehavior: GoBlockSingle
  ): GoChannelBuffer | undefined => {
    const hash = chan_addr + sendq
    return this.handle_chan_unlock(hash, goBlockBehavior)
  }

  pop_chan_recv = (
    chan_addr: number,
    goBlockBehavior: GoBlockSingle
  ): GoChannelBuffer | undefined => {
    const hash = chan_addr + recvq
    return this.handle_chan_unlock(hash, goBlockBehavior)
  }
}
