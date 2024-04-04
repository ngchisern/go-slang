import { Instruction } from '../common/instruction'
import { Memory } from './memory'
import { TimeSliceGoScheduler } from './scheduler'
import { GoVM } from './vm'

export const run = (instrs: Instruction[]) => {
  const memory = new Memory()
  const vm = new GoVM(instrs, memory)
  const scheduler = new TimeSliceGoScheduler(vm)
  scheduler.run()
}
