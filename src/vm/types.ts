import { Goroutine } from './goroutine'
import { Scheduler, TimeSliceGoScheduler } from './scheduler/scheduler'

export interface ISpawnBehavior {
  type: string
}

export class ManualAdd implements ISpawnBehavior {
  type: 'ManualAdd'
  scheduler: Scheduler
}

export class AsyncCommunication implements ISpawnBehavior {
  type: 'AsyncCommunication'
}

export interface ILease {
  type: string
}

export class InstructionBatch implements ILease {
  type: 'InstructionBatch'
  instructionCount: number
}

export class TimeAllocation implements ILease {
  type: 'TimeAllocation'
  duration: number
  start: number
}

export interface IGoBlockBehavior {
  type: string
}

export class GoBlockSingle implements IGoBlockBehavior {
  type: 'GoBlockSingle'
  scheduler: TimeSliceGoScheduler
}

export class GoBlockMulti implements IGoBlockBehavior {
  type: 'GoBlockMulti'
}

export interface IControlInstruction {
  spawnBehavior: ISpawnBehavior
  lease: ILease
  goBlockBehavior: IGoBlockBehavior
}

export interface GoChannelBuffer {
  goroutine: Goroutine,
  addr: number
}