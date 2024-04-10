import { Instruction } from '../common/instruction'
import { SharedMemory } from './memory/sharedMemory'
import { SingleMemory } from './memory/singleMemory'
import { TimeSliceGoScheduler } from './scheduler'
import { GoVM } from './vm'

export const run = (instrs: Instruction[]) => {
  const memory = new SharedMemory()
  const vm = new GoVM(instrs, memory)
  const scheduler = new TimeSliceGoScheduler(vm)
  scheduler.run()
}
