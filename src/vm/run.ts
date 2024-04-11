import { Instruction } from '../common/instruction'
import { ParallelScheduler } from './scheduler/parallelScheduler'
import { TimeSliceGoScheduler } from './scheduler/scheduler'
import { GoVM } from './vm'

export const run = (instrs: Instruction[]) => {
  const scheduler = new TimeSliceGoScheduler(instrs)
  scheduler.run()
}

export async function run_parallel(instrs: Instruction[]) {
  const scheduler = new ParallelScheduler(4, instrs)
  await scheduler.initializeVM()
  await scheduler.run()
}
