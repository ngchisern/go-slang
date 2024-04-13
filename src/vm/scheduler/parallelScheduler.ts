import { Instruction } from '../../common/instruction'
import { Goroutine, GoroutineState, Task } from '../goroutine'
import { SharedMemory } from '../memory/sharedMemory'
import { GoChannelBuffer, InstructionBatch } from '../types'
import { GoVM } from '../vm'
import { Scheduler } from './scheduler'
import { Log, GoAllocate, SetUp, SetUpDone, GoSpawn, GoPark, GoReady, GoReadyReply } from './worker'

export const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null

const worker_path = '/externalLibs/web/bundle.js'

enum WorkerState {
  IDLE,
  RUNNING
}

export class ParallelScheduler implements Scheduler {
  private maxWorker: number
  private workers: Worker[]
  private workerState: WorkerState[]

  private globalRunQueue: Goroutine[]

  private memory: SharedMemory
  private instructions: Instruction[]
  private dummyVM: GoVM

  private blocked: { [key: number]: Set<Goroutine> }
  private channelBlocked: { [key: number]: Set<GoChannelBuffer> }

  constructor(maxWorker: number, instrs: Instruction[]) {
    this.maxWorker = maxWorker
    this.workers = []
    this.workerState = []

    this.globalRunQueue = []

    this.memory = new SharedMemory()
    this.instructions = instrs
    this.dummyVM = new GoVM(instrs, this.memory)

    this.blocked = {}
    this.channelBlocked = {}

    this.create_worker()
  }

  create_worker() {
    try {
      const worker = new Worker(worker_path, { type: 'module' })
      this.workerState.push(WorkerState.IDLE)
      this.workers.push(worker)
      worker.onmessage = this.handleLog
      const done = this.initializeVM(worker)
    } catch (e) {
      console.log(e.message)
    }
  }

  async initializeVM(worker: Worker): Promise<SetUpDone> {
    const setUp: SetUp = {
      type: 'setup',
      state: this.memory.memory_state(),
      instrs: this.instructions
    }

    return await new Promise(resolve => {
      const setUpHandler = (event: MessageEvent) => {
        if (event.data.type === 'setup_done') {
          worker.removeEventListener('message', setUpHandler)
          resolve(event.data as SetUpDone)
        }
      }
      worker.addEventListener('message', setUpHandler)
      worker.postMessage(setUp)
    })
  }

  async run() {
    const main = this.dummyVM.main()
    this.globalRunQueue.push(main)

    const all_done = await this.wait()

    if (!all_done) {
      throw new Error('All goroutines are asleep - deadlock!')
    }
  }

  wait() {
    return new Promise(resolve => {
      const main_listener = (event: MessageEvent) => {
        if (event.data.type === 'main_done') {
          this.teardown()
          resolve(true)
        } else if (event.data.type === 'go_spawn') {
          this.handleGoSpawn(event, main_listener)
        } else if (event.data.type === 'go_park') {
          this.handlePark(event)
        } else if (event.data.type === 'go_ready') {
          this.handleReady(event)
        } else if (event.data.type === 'go_request') {
          this.handleRequest(event)

          if (this.workerState.every(state => state === WorkerState.IDLE)) {
            this.teardown()
            resolve(false)
          }
        }
      }

      this.workers.forEach(worker => {
        worker.addEventListener('message', main_listener)
      })
    })
  }

  handleGoSpawn(event: MessageEvent, mainHandler: (event: MessageEvent) => void) {
    const spawnNew = event.data as GoSpawn
    const newGo = spawnNew.goroutine
    this.add(newGo)

    const workerIdx = this.findIdleWorker()

    if (workerIdx !== -1) {
      return
    }

    if (this.workers.length < this.maxWorker) {
      this.create_worker()
      this.workers[this.workers.length - 1].addEventListener('message', mainHandler)
    }
  }

  handlePark(event: MessageEvent): void {
    const park = event.data as GoPark
    const goroutine = park.goroutine
    const hash = park.hash

    if (park.val_addr) {
      this.add_channel_blocked(hash, goroutine, park.val_addr)
    } else {
      this.add_blocked(hash, goroutine)
    }
  }

  handleReady(event: MessageEvent): void {
    const worker = event.target as Worker

    const ready = event.data as GoReady
    const hash = ready.hash

    if (ready.is_chan) {
      const chan = this.remove_channel_blocked(hash)
      const message: GoReadyReply = chan
        ? {
            type: 'go_ready_reply',
            hash,
            goroutine: chan.goroutine,
            val_addr: chan.addr,
            success: true
          }
        : { type: 'go_ready_reply', hash, success: false }
      worker.postMessage(message)
    } else if (ready.all) {
      const remove = this.remove_blocked_all(hash)
      const message: GoReadyReply = { type: 'go_ready_reply', hash, success: remove }
      worker.postMessage(message)
    } else {
      const go = this.remove_blocked(hash)
      const message: GoReadyReply = go
        ? { type: 'go_ready_reply', hash, goroutine: go, success: true }
        : { type: 'go_ready_reply', hash, success: false }
      worker.postMessage(message)
    }
  }

  add_blocked(addr: number, task: Task) {
    if (!this.blocked[addr]) {
      this.blocked[addr] = new Set()
    }
    this.blocked[addr].add(task as Goroutine)
  }

  remove_blocked(addr: number): Goroutine | undefined {
    if (!this.blocked[addr] || this.blocked[addr].size === 0) {
      return undefined
    }

    const goroutine = this.blocked[addr].values().next().value

    goroutine.state = GoroutineState.RUNNABLE
    this.globalRunQueue.push(goroutine)
    this.blocked[addr].delete(goroutine)
    return goroutine
  }

  remove_blocked_all(addr: number): boolean {
    if (!this.blocked[addr]) {
      return false
    }

    this.blocked[addr].forEach(goroutine => {
      goroutine.state = GoroutineState.RUNNABLE
      this.globalRunQueue.push(goroutine)
    })
    delete this.blocked[addr]

    return true
  }

  add_channel_blocked(addr: number, task: Task, value: number) {
    if (!this.channelBlocked[addr]) {
      this.channelBlocked[addr] = new Set()
    }

    const buffer: GoChannelBuffer = { goroutine: task as Goroutine, addr: value }
    this.channelBlocked[addr].add(buffer)
  }

  remove_channel_blocked(addr: number): GoChannelBuffer | undefined {
    if (!this.channelBlocked[addr] || this.channelBlocked[addr].size === 0) {
      return undefined
    }

    const buffer = this.channelBlocked[addr].values().next().value
    buffer.goroutine.state = GoroutineState.RUNNABLE
    this.channelBlocked[addr].delete(buffer)
    return buffer
  }

  /**
   * If the global run queue is not empty, schedule the goroutines to the worker
   */
  handleRequest(event: MessageEvent): void {
    const worker = event.target as Worker
    const workerIndex = this.workers.indexOf(worker)
    this.workerState[workerIndex] = WorkerState.IDLE

    if (this.globalRunQueue.length > 0) {
      const goroutines = this.globalRunQueue.splice(0, 1)
      this.schedule_to_worker(workerIndex, goroutines)
    }
  }

  findIdleWorker(): number {
    return this.workerState.indexOf(WorkerState.IDLE)
  }

  schedule_to_worker(workerIndex: number, goroutines: Goroutine[]) {
    const run = { type: 'go_allocate', goroutines } as GoAllocate
    this.workers[workerIndex].postMessage(run)
    this.workerState[workerIndex] = WorkerState.RUNNING
  }

  add(task: Task): void {
    this.globalRunQueue.push(task as Goroutine)
  }

  handleLog(event: MessageEvent) {
    if (event.data.type === 'log') {
      const data = event.data as Log
      console.log(...data.args)
    }
  }

  teardown() {
    this.workers.forEach(worker => {
      worker.terminate()
    })
  }
}
