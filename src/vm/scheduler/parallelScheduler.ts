import { Instruction } from '../../common/instruction'
import { Goroutine, Task } from '../goroutine'
import { memory_size, word_size } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import { InstructionBatch } from '../types'
import { GoVM } from '../vm'
import { Scheduler } from './scheduler'
import { Log, Run, RunDone, SetUp, SpawnNew } from './worker'

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

  constructor(maxWorker: number, instrs: Instruction[]) {
    this.maxWorker = maxWorker
    this.workers = []
    this.workerState = []

    this.queue = []

    this.memory = new SharedMemory()
    this.instructions = instrs
    this.dummyVM = new GoVM(instrs, this.memory)

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
    this.schedule_to_worker(0, main)

    const all_done = await this.wait()
  }

  wait() {
    return new Promise(resolve => {
      const runDoneHandler = (event: MessageEvent) => {
        if (event.data.type === 'run_done') {
          if (this.handleRunDone(event)) {
            this.workers.forEach(worker => {
              worker.removeEventListener('message', runDoneHandler)
            })
            resolve(true)
          }
        } else if (event.data.type === 'spawn_new') {
          this.handleSpawnNew(event, runDoneHandler)
        }
      }

      this.workers.forEach(worker => {
        worker.addEventListener('message', runDoneHandler)
      })
    })
  }

  handleRunDone(event: MessageEvent): boolean {
    const workerIndex = this.workers.indexOf(event.target as Worker)
    this.workerState[workerIndex] = WorkerState.IDLE

    const runDone = event.data as RunDone
    const old = runDone.goroutine
    // rehydrate
    const go = new Goroutine(old.id, old.name, old.context)

    if (!go.isComplete(this.dummyVM)) {
      this.add(go)
    } else if (go.name === 'main') {
      return true
    }

    if (this.queue.length > 0) {
      const next = this.queue.shift()
      if (next) {
        this.schedule_to_worker(workerIndex, next)
      }
    }

    return false
  }

  handleSpawnNew(event: MessageEvent, runDoneHandler: (event: MessageEvent) => void) {
    const spawnNew = event.data as SpawnNew
    const newGo = spawnNew.goroutine

    const workerIdx = this.findIdleWorker()

    if (workerIdx !== -1) {
      this.schedule_to_worker(workerIdx, newGo)
      return
    }

    if (this.workers.length >= this.maxWorker) {
      this.add(newGo)
    } else {
      this.create_worker()
      const workerIdx = this.workers.length - 1
      this.workers[workerIdx].addEventListener('message', runDoneHandler)
      this.schedule_to_worker(workerIdx, newGo)
    }
  }

  findIdleWorker(): number {
    return this.workerState.indexOf(WorkerState.IDLE)
  }

  schedule_to_worker(workerIndex: number, goroutine: Goroutine) {
    if (this.workerState[workerIndex] === WorkerState.RUNNING) {
      console.log('cannot assign a task to a busy worker')
      return
    }

    const lease: InstructionBatch = { type: 'InstructionBatch', instructionCount: 5 }
    const run = { type: 'run', goroutine, lease } as Run
    this.workers[workerIndex].postMessage(run)
    this.workerState[workerIndex] = WorkerState.RUNNING
  }

  add(task: Task): void {
    this.queue.push(task as Goroutine)
  }

  handleLog(event: MessageEvent) {
    if (event.data.type === 'log') {
      const data = event.data as Log
      console.log(...data.args)
    }
  }
}
