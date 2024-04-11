import { Instruction } from '../../common/instruction'
import { Goroutine, Task } from '../goroutine'
import { memory_size, word_size } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import { GoVM } from '../vm'
import { Scheduler } from './scheduler'
import { SetUp } from './worker'

export const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null

const worker_path = '/externalLibs/web/bundle.js'

export class ParallelScheduler implements Scheduler {
  private workers: Worker[]
  private queue: Goroutine[]
  private workerCount: number

  // memory
  private memory: SharedMemory
  private sharedArrayBuffer: SharedArrayBuffer

  private instructions: Instruction[]

  // round robin scheduler
  private workerIndex: number = 0

  constructor(workerCount: number, instrs: Instruction[]) {
    this.workers = []
    this.queue = []
    this.workerCount = workerCount

    this.memory = new SharedMemory()
    this.sharedArrayBuffer = this.memory.data

    this.instructions = instrs

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
      buffer: this.sharedArrayBuffer,
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
    // const main = new GoVM(this.instructions, this.memory).main()

    // const worker = this.workers[this.workerIndex++]

    // worker.postMessage({ type: 'run', goroutine: main })

    await this.wait()
  }

  wait() {
    return new Promise(resolve => {
      const runDoneHandler = (event: MessageEvent) => {
        if (event.data.type === 'run_done') {
          const { goroutine } = event.data

          if (goroutine.isComplete()) {
            resolve(true)
          } else {
            console.log('Goroutine is not complete:', goroutine)
            this.queue.push(goroutine)
            resolve(false)
          }
        }
      }
      this.workers[this.workerIndex].addEventListener('message', runDoneHandler)
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
