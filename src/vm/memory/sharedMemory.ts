import { GoTag } from '../../common/types'
import { Goroutine, GoroutineState } from '../goroutine'
import { GoPark, GoReady, GoReadyReply, GoSpawn } from '../scheduler/worker'
import { GoBlockMulti, GoBlockSingle, GoChannelBuffer, IGoBlockBehavior } from '../types'
import { recvq, sendq } from '../utils'
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

  lock(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_Mutex(address)) {
      console.error('not a mutex')
    }

    state.OS.pop() // pop the fun; apply builtin will pop the method name

    const locked = this.atomic_compare_exchange_mem_64(address + 1, 0, 1)
    if (locked === 1) {
      // handle state where mutex is already locked
      state.state = GoroutineState.BLOCKED
      this.handle_lock(state, address, goBlockBehavior as GoBlockMulti)
    } else {
      this.mem_set(address + 2, state.currentThread as number)
    }

    return address
  }

  async unlock(state: VMState, goBlockBehavior: IGoBlockBehavior): Promise<number> {
    // pop the second last element
    const address = state.OS[state.OS.length - 2]

    if (!this.is_Mutex(address)) {
      throw new Error('not a mutex')
    }

    // const locked = this.atomic_compare_exchange_mem_64(address + 1, 1, 0)
    const locked = this.mem_get(address + 1)
    const owner = this.mem_get(address + 2)

    if (locked === 0 || owner !== state.currentThread) {
      throw new Error('sync: unlock of unlocked mutex')
    }

    let waiting = await this.handle_unlock(address, goBlockBehavior as GoBlockMulti)

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

    const additional = this.address_to_JS_value(state.OS.pop())
    this.atomic_add_mem_64(address + 1, additional)

    state.OS.pop()
    return address
  }

  wg_wait(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    state.OS.pop()

    const count = this.mem_get(address + 1)
    if (count !== 0) {
      state.state = GoroutineState.BLOCKED
      this.handle_lock(state, address, goBlockBehavior as GoBlockMulti)
    }

    return address
  }

  wg_done(state: VMState, goBlockBehavior: IGoBlockBehavior): number {
    const address = state.OS[state.OS.length - 2]

    if (!this.is_WaitGroup(address)) {
      throw new Error('not a WaitGroup')
    }

    this.atomic_sub_mem_64(address + 1, 1)

    if (this.mem_get(address + 1) === 0) {
      this.handle_unlock_all(address, goBlockBehavior as GoBlockMulti)
    }

    state.OS.pop()
    return address
  }

  async channel_send(state: VMState, goBlockBehavior: IGoBlockBehavior): Promise<number> {
    const in_addr = state.OS.pop()
    const chan_addr = state.OS.pop()

    if (!this.is_Channel(chan_addr)) {
      console.error('send: not a channel')
      return chan_addr
    }

    state.OS.pop()

    const val = this.address_to_JS_value(in_addr)
    const val_addr = this.JS_value_to_address({ tag: GoTag.Int, val })

    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5 // 5 config values

      // attmempting to acquire the lock on the channel
      const lockAddr = chan_addr + 4
      // busy waiting here: should get the lock relatively fast
      while (this.atomic_compare_exchange_mem_64(lockAddr, 0, 1) === 1) {}

      let old_count = this.mem_get(chan_addr + 2)
      let new_count = old_count + 1

      if (old_count >= buffer_size) {
        state.state = GoroutineState.BLOCKED
        const hash = chan_addr + sendq
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockMulti)

        this.atomic_sub_mem_64(lockAddr, 1)
        return chan_addr
      }

      const receiver = await this.peek_chan_recv(chan_addr, goBlockBehavior as GoBlockMulti)

      if (receiver && receiver.goroutine) {
        if (old_count !== 0) {
          console.log('should not happen')
        } else {
          const addr = receiver.addr
          this.mem_set(addr + 1, this.mem_get(val_addr + 1))
          this.put_to_global_run_queue(receiver.goroutine)
        }
      } else {
        const slotOut = this.mem_get(chan_addr + 3)
        const slotIn = (slotOut + old_count) % buffer_size

        this.mem_set(chan_addr + 2, new_count)
        this.mem_set_child(chan_addr, 4 + slotIn, val_addr)
      }

      // release the lock
      this.atomic_sub_mem_64(lockAddr, 1)
    } else {
      // unbuffered channel
      const receiver = await this.peek_chan_recv(chan_addr, goBlockBehavior as GoBlockMulti)

      if (receiver && receiver.goroutine) {
        const addr = receiver.addr
        this.mem_set(addr + 1, this.mem_get(val_addr + 1))
        this.put_to_global_run_queue(receiver.goroutine)
      } else {
        const hash = chan_addr + sendq
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockMulti)
        state.state = GoroutineState.BLOCKED
      }
    }

    return chan_addr
  }

  async channel_receive(chan_addr: number, state: VMState, goBlockBehavior: IGoBlockBehavior) {
    // reserve memory location for the dummy value (only integer supproted now)
    const val_addr = this.JS_value_to_address({ tag: GoTag.Int, val: 0 })

    if (this.is_Buffered_Channel(chan_addr)) {
      const buffer_size = this.mem_get_size(chan_addr) - 5 // 5 config values

      // attmempting to acquire the lock on the channel
      const lockAddr = chan_addr + 4
      while (this.atomic_compare_exchange_mem_64(lockAddr, 0, 1) === 1) {}

      let old_count = this.mem_get(chan_addr + 2)
      let new_count = old_count - 1

      if (old_count === 0) {
        const hash = chan_addr + recvq
        state.state = GoroutineState.BLOCKED

        // TODO: wrapper because of inefficient communication
        state.OS.push(val_addr)
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockMulti)
        state.OS.pop()

        this.atomic_sub_mem_64(lockAddr, 1)
        return val_addr
      }

      const slotOut = this.mem_get(chan_addr + 3)
      const addr = this.mem_get_child(chan_addr, 4 + slotOut)

      // copy the value
      this.mem_set(val_addr + 1, this.mem_get(addr + 1))

      const sender = await this.peek_chan_send(chan_addr, goBlockBehavior as GoBlockMulti)
      if (old_count === buffer_size && sender && sender.goroutine) {
        const saddr = sender.addr
        this.mem_set(chan_addr + 4 + slotOut, this.mem_get(saddr + 1))
        this.put_to_global_run_queue(sender.goroutine)
      } else {
        this.mem_set(chan_addr + 2, new_count)
      }

      this.mem_set(chan_addr + 3, (slotOut + 1) % buffer_size)

      // release the lock
      this.atomic_sub_mem_64(lockAddr, 1)
      return val_addr
    } else {
      const sender = await this.peek_chan_send(chan_addr, goBlockBehavior as GoBlockMulti)

      if (sender && sender.goroutine) {
        const addr = sender.addr
        this.mem_set(val_addr + 1, this.mem_get(addr + 1))
        this.put_to_global_run_queue(sender.goroutine)
      } else {
        const hash = chan_addr + recvq
        state.state = GoroutineState.BLOCKED

        // TODO: wrapper because of inefficient communication
        state.OS.push(val_addr)
        this.handle_chan_lock(state, hash, val_addr, goBlockBehavior as GoBlockMulti)
        state.OS.pop()
      }

      return val_addr
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

  handle_lock = (state: VMState, addr: number, goBlockBehavior: GoBlockMulti) => {
    const goroutine = new Goroutine(state.currentThread as number, state.currentThreadName, state)
    const goPark = { type: 'go_park', hash: addr, goroutine } as GoPark
    postMessage(goPark)
  }

  async handle_unlock(addr: number, goBlockBehavior: GoBlockMulti): Promise<Goroutine | undefined> {
    const goReady = { type: 'go_ready', hash: addr } as GoReady

    return await new Promise((resolve, reject) => {
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'go_ready_reply') {
          const { goroutine, hash, success } = e.data as GoReadyReply
          if (hash === addr) {
            const go = success ? goroutine : undefined
            removeEventListener('message', handler)
            resolve(go)
          }
        }
      }

      addEventListener('message', handler)
      /// post message and wait for reply
      postMessage(goReady)
    })
  }

  async handle_unlock_all(addr: number, goBlockBehavior: GoBlockMulti): Promise<boolean> {
    const goReady = { type: 'go_ready', hash: addr } as GoReady

    return await new Promise((resolve, reject) => {
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'go_ready_reply') {
          const { hash, success } = e.data as GoReadyReply
          if (hash === addr) {
            removeEventListener('message', handler)
            resolve(success)
          }
        }
      }

      addEventListener('message', handler)
      /// post message and wait for reply
      postMessage(goReady)
    })
  }

  handle_chan_lock = (
    state: VMState,
    addr: number,
    valueAddr: number,
    goBlockBehavior: GoBlockMulti
  ) => {
    const goroutine = new Goroutine(state.currentThread, state.currentThreadName, state)
    const goPark = { type: 'go_park', hash: addr, goroutine, val_addr: valueAddr } as GoPark
    postMessage(goPark)
  }

  async handle_chan_unlock(
    fhash: number,
    goBlockBehavior: GoBlockMulti
  ): Promise<GoChannelBuffer | undefined> {
    const goReady = { type: 'go_ready', hash: fhash, is_chan: true } as GoReady

    return await new Promise((resolve, reject) => {
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'go_ready_reply') {
          const { goroutine, hash, val_addr, success } = e.data as GoReadyReply
          if (fhash === hash) {
            const go = success ? goroutine : undefined
            removeEventListener('message', handler)
            resolve({ goroutine: go, addr: val_addr } as GoChannelBuffer)
          }
        }
      }

      addEventListener('message', handler)
      /// post message and wait for reply
      postMessage(goReady)
    })
  }

  async peek_chan_send(
    chan_addr: number,
    goBlockBehavior: GoBlockMulti
  ): Promise<GoChannelBuffer | undefined> {
    const hash = chan_addr + sendq
    return await this.handle_chan_unlock(hash, goBlockBehavior)
  }

  async peek_chan_recv(
    chan_addr: number,
    goBlockBehavior: GoBlockMulti
  ): Promise<GoChannelBuffer | undefined> {
    const hash = chan_addr + recvq
    return await this.handle_chan_unlock(hash, goBlockBehavior)
  }

  put_to_global_run_queue(goroutine: Goroutine): void {
    // use this interface for now
    const goSpawn = { type: 'go_spawn', goroutine } as GoSpawn
    postMessage(goSpawn)
  }
}
