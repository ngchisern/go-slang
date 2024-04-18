import { Instruction } from '../common/instruction'
import { ParallelScheduler } from './scheduler/parallelScheduler'
import { TimeSliceGoScheduler } from './scheduler/scheduler'
import { GoVM } from './vm'

export async function run(instrs: Instruction[]) {
  const scheduler = new TimeSliceGoScheduler(instrs)
  // May throw err here.
  await scheduler.run()
}

export async function run_parallel(instrs: Instruction[]) {
  const scheduler = new ParallelScheduler(navigator.hardwareConcurrency, instrs)
  // May throw err here.
  await scheduler.run()
}
