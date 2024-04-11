import { Instruction } from '../common/instruction'
import { SharedMemory } from './memory/sharedMemory'
import { SingleMemory } from './memory/singleMemory'
import { ParallelScheduler } from './scheduler/parallelScheduler'
import { TimeSliceGoScheduler } from './scheduler/scheduler'
import { GoVM } from './vm'

export const run = (instrs: Instruction[]) => {
  const memory = new SingleMemory()
  const vm = new GoVM(instrs, memory)
  const scheduler = new TimeSliceGoScheduler(vm)
  scheduler.run()
}

export const run_parallel = (instrs: Instruction[]) => {
  const scheduler = new ParallelScheduler(4, instrs)
  scheduler.run()
}
