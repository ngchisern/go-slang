import { Instruction } from '../../common/instruction'
import { Goroutine, Task } from '../goroutine'
import { memory_size, word_size } from '../memory/memory'
import { Scheduler } from './scheduler'
import { MemomryData } from './worker'

export const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null

const worker_path = '/externalLibs/web/bundle.js'

export class ParallelScheduler implements Scheduler {
  private sharedArrayBuffer: SharedArrayBuffer

  private workers: Worker[]
  private queue: Goroutine[]

  constructor(workerCount: number, instrs: Instruction[]) {
    this.workers = []
    this.queue = []
    this.sharedArrayBuffer = new SharedArrayBuffer(memory_size * word_size)

    for (let i = 0; i < workerCount; i++) {
      this.create_worker()
    }

    this.initializeVM()
  }

  create_worker() {
    try {
      const worker = new Worker(worker_path, { type: 'module' });
      worker.onmessage = this.handleWorkerMessage
      this.workers.push(worker)
    } catch (e) {
      console.log(e)
    }
  }

  initializeVM() {
    const memoryData: MemomryData = { type: 'MemoryData', data: this.sharedArrayBuffer }

    const promisess = this.workers.map(worker => {
      return new Promise(resolve => {
        const messageHandler = (event: MessageEvent) => {
          worker.removeEventListener('message', messageHandler)
          resolve(event.data)
        }
        worker.addEventListener('message', messageHandler)
        worker.postMessage(memoryData)

        worker.onmessage = (e: MessageEvent) => {
          console.log('Worker response to memoryData:', e.data)
          resolve(e.data)
        }
      })
    })

    const results = Promise.all(promisess)
    console.log('All workers have responded:', results)
  }

  async run(): Promise<void> {
    throw new Error('Method not implemented.')
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
