import { Builtin, Memory } from './memory/memory'
import { ILease, InstructionBatch, TimeAllocation } from './types'

export const False_tag = 0
export const True_tag = 1
export const Number_tag = 2
export const Null_tag = 3
export const Unassigned_tag = 4
export const Undefined_tag = 5
export const Blockframe_tag = 6
export const Callframe_tag = 7
export const Closure_tag = 8
export const Frame_tag = 9
export const Environment_tag = 10
export const Pair_tag = 11
export const Builtin_tag = 12
export const Mutex_tag = 13
export const WaitGroup_tag = 14
export const Buffered_Channel_tag = 15
export const Unbuffered_Channel_tag = 16

/* ************************
 * compile-time environment
 * ************************/

// a compile-time environment is an array of
// compile-time frames, and a compile-time frame
// is an array of symbols

// find the position [frame-index, value-index]
// of a given symbol x
// TODO: Change the type of x to string
export const compile_time_environment_position = (env: string[][], x: string): [number, number] => {
  let frame_index = env.length
  while (frame_index > 0 && value_index(env[--frame_index], x) === -1) {}
  if (value_index(env[frame_index], x) === -1) throw new Error(`Name ${x} not found`)
  return [frame_index, value_index(env[frame_index], x)]
}

const value_index = (frame: string[], x: string) => {
  for (let i = 0; i < frame.length; i++) {
    if (frame[i] === x) return i
  }
  return -1
}

/* **********************
 * operators and builtins
 * **********************/

export const is_boolean = (x: any) => typeof x === 'boolean'

export const is_number = (x: any) => typeof x === 'number'

export const is_undefined = (x: any) => x === undefined

export const is_null = (x: any) => x === null

export const is_pair = (x: any) => Array.isArray(x) && x.length === 2

export const head = (x: any) => x[0]

export const tail = (x: any) => x[1]

/*
 * Go Channel Hashing
 */

export const sendq = 0

export const recvq = 1

/**
 * Lease Util
 */

export const start_lease = (lease: ILease) => {
  if (lease.type === 'InstructionBatch') {
    // DO NOTHING
  } else if (lease.type === 'TimeAllocation') {
    const timeAllocation = lease as TimeAllocation
    timeAllocation.start = Date.now()
  } else {
    console.log('other lease type is not supported')
  }
}

export const check_lease = (lease: ILease): boolean => {
  if (lease.type === 'InstructionBatch') {
    const instructionBatch = lease as InstructionBatch
    return instructionBatch.instructionCount > 0
  } else if (lease.type === 'TimeAllocation') {
    const timeAllocation = lease as TimeAllocation
    const elapsedTime = Date.now() - timeAllocation.start
    return elapsedTime < timeAllocation.duration
  } else {
    console.log('other lease type is not supported')
    return true
  }
}

export const lease_per_loop_update = (lease: ILease) => {
  if (lease.type === 'InstructionBatch') {
    const instructionBatch = lease as InstructionBatch
    instructionBatch.instructionCount--
  } else if (lease.type === 'TimeAllocation') {
    const timeAllocation = lease as TimeAllocation
    // DO NOTHING
  } else {
    console.log('other lease type is not supported')
  }
}

export const exceed_lease = (lease: ILease): boolean => {
  if (lease.type === 'InstructionBatch') {
    const instructionBatch = lease as InstructionBatch
    return instructionBatch.instructionCount <= 0
  } else if (lease.type === 'TimeAllocation') {
    const timeAllocation = lease as TimeAllocation
    const buffer = 100
    const elapsedTime = Date.now() - timeAllocation.start
    return elapsedTime > timeAllocation.duration + buffer
  } else {
    console.log('other lease type is not supported')
    return true
  }
}
