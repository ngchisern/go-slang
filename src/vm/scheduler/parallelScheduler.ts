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

export class ParallelScheduler implements Scheduler {
  private workers: Worker[]
  private queue: Goroutine[]
  private workerCount: number

  private memory: SharedMemory
  private instructions: Instruction[]
  private dummyVM: GoVM

  // round robin scheduler
  private workerIndex: number = 0

  constructor(workerCount: number, instrs: Instruction[]) {
    this.workers = []
    this.queue = []
    this.workerCount = workerCount

    this.memory = new SharedMemory()
    this.instructions = instrs
    this.dummyVM = new GoVM(instrs, this.memory)

    // for (let i = 0; i < workerCount; i++) {
    this.create_worker()
    // }
  }

  create_worker() {
    try {
      const worker = new Worker(worker_path, { type: 'module' })
      worker.onmessage = this.handleWorkerMessage
      this.workers.push(worker)
    } catch (e) {
      console.log(e)
    }
  }

  async initializeVM() {
    const setUp: SetUp = {
      type: 'setup',
      state: this.memory.memory_state(),
      instrs: this.instructions
    }

    const promisess = this.workers.map(worker => {
      return new Promise(resolve => {
        const setUpHandler = (event: MessageEvent) => {
          if (event.data.type === 'setup_done') {
            worker.removeEventListener('message', setUpHandler)
            resolve(event.data)
          }
        }
        worker.addEventListener('message', setUpHandler)
        worker.postMessage(setUp)
      })
    })

    const results = await Promise.all(promisess)
    console.log('All workers have responded:', results)
  }

  async run() {
    const main = this.dummyVM.main()

    const worker = this.workers[this.workerIndex++]

    worker.postMessage({ type: 'run', goroutine: main })

    await this.wait()
  }

  wait() {
    return new Promise(resolve => {
      const runDoneHandler = (event: MessageEvent) => {
        if (event.data.type === 'run_done') {
          const { goroutine } = event.data as RunDone

          // rehydrate the goroutine
          const go = new Goroutine(goroutine.id, goroutine.name, goroutine.context)

          if (go.isComplete(this.dummyVM)) {
            resolve(true)
          } else {
            console.log('Goroutine is not complete:', goroutine)
            this.queue.push(go)
            resolve(false)
          }
        }
      }
      const index = this.workerIndex % this.workers.length
      this.workers[index].addEventListener('message', runDoneHandler)
    })
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

  handleWorkerMessage(event: MessageEvent) {
    console.log('main', event.data)
  }
}
