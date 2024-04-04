import { error } from 'console'
import { Builtin, Memory } from './memory'

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

export const mem_make = (bytes: number): DataView => {
  if (bytes % 8 !== 0) {
    error('mem bytes must be divisible by 8')
  }
  const data = new ArrayBuffer(bytes)
  const view = new DataView(data)
  return view
}

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
  while (value_index(env[--frame_index], x) === -1) {}
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
