import { Instruction } from '../../common/instruction'
import { Goroutine, Task } from '../goroutine'
import { memory_size, word_size } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import { GoVM } from '../vm'
import { Scheduler } from './scheduler'
import { RunDone, SetUp } from './worker'

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

  private queue: Goroutine[]

  private memory: SharedMemory
  private instructions: Instruction[]
  private dummyVM: GoVM

  // round robin scheduler
  private workerIndex: number = 0

  constructor(maxWorker: number, instrs: Instruction[]) {
    this.maxWorker = maxWorker
    this.workers = []
    this.workerState = []

    this.queue = []

    this.memory = new SharedMemory()
    this.instructions = instrs
    this.dummyVM = new GoVM(instrs, this.memory)

    for (let i = 0; i < maxWorker; i++) {
      this.create_worker()
    }
  }

  create_worker() {
    try {
      const worker = new Worker(worker_path, { type: 'module' })
      this.workerState.push(WorkerState.IDLE)
      this.workers.push(worker)
      const done = this.initializeVM(worker)
      console.log('worker', this.workers.length, 'initialized')
    } catch (e) {
      console.log(e)
    }
  }

  async initializeVM(worker: Worker): Promise<RunDone> {
    const setUp: SetUp = {
      type: 'setup',
      state: this.memory.memory_state(),
      instrs: this.instructions
    }

    return await new Promise(resolve => {
      const setUpHandler = (event: MessageEvent) => {
        if (event.data.type === 'setup_done') {
          worker.removeEventListener('message', setUpHandler)
          resolve(event.data)
        }
      }
      worker.addEventListener('message', setUpHandler)
      worker.postMessage(setUp)
    })
  }

  async run() {
    const main = this.dummyVM.main()
    this.workers.forEach(worker => {
      worker.postMessage({ type: 'run', goroutine: main })
    })

    const all_done = await this.wait()
    console.log('all done', all_done)
  }

  wait() {
    return new Promise(resolve => {
      const runDoneHandler = (event: MessageEvent) => {
        if (event.data.type === 'run_done') {
          if (this.handle_run_done(event)) {
            this.workers.forEach(worker => {
              worker.removeEventListener('message', runDoneHandler)
            })
            resolve(true)
          }
        }
      }

      this.workers.forEach(worker => {
        worker.addEventListener('message', runDoneHandler)
      })
    })
  }

  handle_run_done(event: MessageEvent): boolean {
    const workerIndex = this.workers.indexOf(event.target as Worker)
    this.workerState[workerIndex] = WorkerState.IDLE

    if (this.queue.length === 0 && this.workerState.every(state => state === WorkerState.IDLE)) {
      return true
    }

    if (this.queue.length > 0) {
      const next = this.queue.shift()
      if (next) {
        this.workers[workerIndex].postMessage({ type: 'run', goroutine: next })
        this.workerState[workerIndex] = WorkerState.RUNNING
      }
    }

    return false
  }

  add(task: Task): void {
    throw new Error('Method not implemented.')
  }

  checkCondition(): boolean {
    throw new Error('Method not implemented.')
  }

  postLoopUpdate(): void {
    throw new Error('Method not implemented.')
  }
}
