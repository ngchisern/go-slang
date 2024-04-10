import { Goroutine, GoroutineState, Task } from './goroutine'
import { GoVM, VirtualMachine } from './vm'

export interface Scheduler {
  vm: VirtualMachine

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
      console.log(asleep_count, this.queue.length)
      if (asleep_count >= this.queue.length) {
        throw new Error('All goroutines are asleep - deadlock!')
      }

      const go = this.queue.shift() as Goroutine
      this.vm.switch(go)

      this.resetTimeSlice()
      this.vm.run(this)

      this.vm.save(go)
      if (!go.isComplete(this.vm)) {
        this.queue.push(go)
      } else if (go == main) {
        break
      }

      if (go.state == GoroutineState.BLOCKED) {
        asleep_count++
      } else {
        asleep_count = 0
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
