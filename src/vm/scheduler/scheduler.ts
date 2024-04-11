import { Instruction } from '../../common/instruction'
import { Goroutine, GoroutineState, Task } from '../goroutine'
import { SingleMemory } from '../memory/singleMemory'
import {
  IControlInstruction,
  ISpawnBehavior,
  InstructionBatch,
  ManualAdd,
  TimeAllocation
} from '../types'
import { GoVM } from '../vm'

export interface Scheduler {
  run(): void
  add(task: Task): void
}

export class TimeSliceGoScheduler implements Scheduler {
  vm: GoVM
  private timeSlice: number
  private queue: Goroutine[]

  constructor(instrs: Instruction[]) {
    const memory = new SingleMemory()
    const vm = new GoVM(instrs, memory)

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

      const has_run = this.vm.run(this.create_control_instruction())

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

  create_control_instruction(): IControlInstruction {
    const lease: InstructionBatch = { type: 'InstructionBatch', instructionCount: 5 }
    const spawnBehavior: ManualAdd = { type: 'ManualAdd', scheduler: this }

    return { lease, spawnBehavior } as IControlInstruction
  }
}
