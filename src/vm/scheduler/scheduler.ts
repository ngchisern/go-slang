import { Goroutine, GoroutineState, Task } from '../goroutine'
import { GoVM } from '../vm'

export interface Scheduler {
  run(): void
  add(task: Task): void

  checkCondition(): boolean
  postLoopUpdate(): void
}

export class TimeSliceGoScheduler implements Scheduler {
  vm: GoVM
  private timeSlice: number
  private queue: Goroutine[]

  constructor(vm: GoVM) {
    this.queue = []
    this.vm = vm
  }

  run() {
    const main = this.vm.main()
    this.queue.push(main)
    let asleep_count = 0

    while (this.queue.length > 0) {
      if (asleep_count >= this.queue.length) {
        throw new Error('All goroutines are asleep - deadlock!')
      }

      const go = this.queue.shift() as Goroutine
      this.vm.switch(go)

      this.resetTimeSlice()
      const has_run = this.vm.run(this)

      this.vm.save(go)
      if (!go.isComplete(this.vm)) {
        this.queue.push(go)
      } else if (go == main) {
        break
      }

      if (has_run) {
        asleep_count = 0
      } else {
        asleep_count++
      }
    }
  }

  add(task: Task) {
    this.queue.push(task as Goroutine)
  }

  checkCondition(): boolean {
    return this.timeSlice > 0
  }

  postLoopUpdate() {
    this.timeSlice--
  }

  resetTimeSlice() {
    this.timeSlice = 5 // 5 instructions
  }
}
