import { address_to_JS_value, memory } from './memory'

export const word_size = 8
const mega = 2 ** 20

export interface Block {
  position: number // in word
  free: number
  size: number
}

const size_offset = 5
const mem_allocate = (block: Block, tag: number, size: number): number => {
  if (block.free + size >= block.size) {
    throw new Error('Out of memory')
  }

  const address = block.position + block.free
  block.free += size

  memory.setUint8(address * word_size, tag)
  memory.setUint16(address * word_size + size_offset, size)
  return address
}

// get and set a word in mem at given address
export const mem_get = (address: number) => memory.getFloat64(address * word_size)

const mem_set = (address: number, x: number) => memory.setFloat64(address * word_size, x)

// child index starts at 0
export const mem_get_child = (address: number, child_index: number) =>
  mem_get(address + 1 + child_index)

export const mem_set_child = (address: number, child_index: number, value: number) =>
  mem_set(address + 1 + child_index, value)

const mem_get_tag = (address: number) => memory.getUint8(address * word_size)

const mem_get_size = (address: number) => memory.getUint16(address * word_size + size_offset)

// access byte in mem, using address and offset
const mem_set_byte_at_offset = (address: number, offset: number, value: number) =>
  memory.setUint8(address * word_size + offset, value)

const mem_get_byte_at_offset = (address: number, offset: number) =>
  memory.getUint8(address * word_size + offset)

// access byte in mem, using address and offset
const mem_set_2_bytes_at_offset = (address: number, offset: number, value: number) =>
  memory.setUint16(address * word_size + offset, value)

const mem_get_2_bytes_at_offset = (address: number, offset: number) =>
  memory.getUint16(address * word_size + offset)

const False_tag = 0
const True_tag = 1
const Number_tag = 2
const Null_tag = 3
const Unassigned_tag = 4
const Undefined_tag = 5
const Blockframe_tag = 6
const Callframe_tag = 7
const Closure_tag = 8
const Frame_tag = 9
const Environment_tag = 10
const Pair_tag = 11
const Builtin_tag = 12

// boolean values carry their value (0 for false, 1 for true)
// in the byte following the tag
export let False: number
export const is_False = (address: number) => mem_get_tag(address) === False_tag

export let True: number
export const is_True = (address: number) => mem_get_tag(address) === True_tag

export const is_Boolean = (address: number) => is_True(address) || is_False(address)

export let Null: number
export const is_Null = (address: number) => mem_get_tag(address) === Null_tag

export let Unassigned: number
export const is_Unassigned = (address: number) => mem_get_tag(address) === Unassigned_tag

export let Undefined: number
export const is_Undefined = (address: number) => mem_get_tag(address) === Undefined_tag

export const allocate_literal_values = (block: Block) => {
  False = mem_allocate(block, False_tag, 1)
  True = mem_allocate(block, True_tag, 1)
  Null = mem_allocate(block, Null_tag, 1)
  Unassigned = mem_allocate(block, Unassigned_tag, 1)
  Undefined = mem_allocate(block, Undefined_tag, 1)
}

// builtins: builtin id is encoded in second byte
// [1 byte tag, 1 byte id, 3 bytes unused,
//  2 bytes #children, 1 byte unused]
// Note: #children is 0

export const is_Builtin = (address: number) => mem_get_tag(address) === Builtin_tag

export const mem_allocate_Builtin = (block: Block, id: number) => {
  const address = mem_allocate(block, Builtin_tag, 1)
  mem_set_byte_at_offset(address, 1, id)
  return address
}

export const mem_get_Builtin_id = (address: number) => mem_get_byte_at_offset(address, 1)

// closure
// [1 byte tag, 1 byte arity, 2 bytes pc, 1 byte unused,
//  2 bytes #children, 1 byte unused]
// followed by the address of env
// note: currently bytes at offset 4 and 7 are not used;
//   they could be used to increase pc and #children range

export const mem_allocate_Closure = (block: Block, arity: number, pc: number, env: number) => {
  const address = mem_allocate(block, Closure_tag, 2)
  mem_set_byte_at_offset(address, 1, arity)
  mem_set_2_bytes_at_offset(address, 2, pc)
  mem_set(address + 1, env)
  return address
}

const mem_get_Closure_arity = (address: number) => mem_get_byte_at_offset(address, 1)

export const mem_get_Closure_pc = (address: number) => mem_get_2_bytes_at_offset(address, 2)

export const mem_get_Closure_environment = (address: number) => mem_get_child(address, 0)

export const is_Closure = (address: number) => mem_get_tag(address) === Closure_tag

// block frame
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]

export const mem_allocate_Blockframe = (block: Block, env: number) => {
  const address = mem_allocate(block, Blockframe_tag, 2)
  mem_set(address + 1, env)
  return address
}

export const mem_get_Blockframe_environment = (address: number) => mem_get_child(address, 0)

const is_Blockframe = (address: number) => mem_get_tag(address) === Blockframe_tag

// call frame
// [1 byte tag, 1 byte unused, 2 bytes pc,
//  1 byte unused, 2 bytes #children, 1 byte unused]
// followed by the address of env

export const mem_allocate_Callframe = (block: Block, env: number, pc: number) => {
  const address = mem_allocate(block, Callframe_tag, 2)
  mem_set_2_bytes_at_offset(address, 2, pc)
  mem_set(address + 1, env)
  return address
}

export const mem_get_Callframe_environment = (address: number) => mem_get_child(address, 0)

export const mem_get_Callframe_pc = (address: number) => mem_get_2_bytes_at_offset(address, 2)

export const is_Callframe = (address: number) => mem_get_tag(address) === Callframe_tag

// environment frame
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the addresses of its values

export const mem_allocate_Frame = (block: Block, number_of_values: number) =>
  mem_allocate(block, Frame_tag, number_of_values + 1)

// environment
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the addresses of its frames

export const mem_allocate_Environment = (block: Block, number_of_frames: number) =>
  mem_allocate(block, Environment_tag, number_of_frames + 1)

// access environment given by address
// using a "position", i.e. a pair of
// frame index and value index
export const mem_get_Environment_value = (env_address: number, position: [number, number]) => {
  const [frame_index, value_index] = position
  const frame_address = mem_get_child(env_address, frame_index)
  return mem_get_child(frame_address, value_index)
}

export const mem_set_Environment_value = (
  env_address: number,
  position: [number, number],
  value: number
) => {
  //display(env_address, "env_address:")
  const [frame_index, value_index] = position
  const frame_address = mem_get_child(env_address, frame_index)
  mem_set_child(frame_address, value_index, value)
}

// extend a given environment by a new frame:
// create a new environment that is bigger by 1
// frame slot than the given environment.
// copy the frame Addresses of the given
// environment to the new environment.
// enter the address of the new frame to end
// of the new environment
export const mem_Environment_extend = (
  block: Block,
  frame_address: number,
  env_address: number
) => {
  const old_size = mem_get_size(env_address)
  const new_env_address = mem_allocate_Environment(block, old_size)
  let i
  for (i = 0; i < old_size - 1; i++) {
    mem_set_child(new_env_address, i, mem_get_child(env_address, i))
  }
  mem_set_child(new_env_address, i, frame_address)
  return new_env_address
}

// pair
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by head and tail addresses, one word each
export const mem_allocate_Pair = (block: Block, hd: number, tl: number) => {
  const pair_address = mem_allocate(block, Pair_tag, 3)
  mem_set_child(pair_address, 0, hd)
  mem_set_child(pair_address, 1, tl)
  return pair_address
}

export const is_Pair = (address: number) => mem_get_tag(address) === Pair_tag

// number
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the number, one word
// note: #children is 0

export const mem_allocate_Number = (block: Block, n: number) => {
  const number_address = mem_allocate(block, Number_tag, 2)
  mem_set(number_address + 1, n)
  return number_address
}

export const is_Number = (address: number) => mem_get_tag(address) === Number_tag

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

/**
 * Builtins
 */
// in this machine, the builtins take their
// arguments directly from the operand stack,
// to save the creation of an intermediate
// argument array
export const builtin_object: { [key: string]: (OS: Array<any>) => any } = {
  'fmt.Println': OS => {
    const address = OS.pop()
    console.log(address_to_JS_value(address))
    return address
  }
}

export interface Builtin {
  tag: 'BUILTIN'
  id: number
  arity: number
}

export const primitive_object: { [key: string]: Builtin } = {}
export const builtin_array: Array<any> = []
{
  let i = 0
  for (const key in builtin_object) {
    primitive_object[key] = {
      tag: 'BUILTIN',
      id: i,
      arity: 1
    }
    builtin_array[i++] = builtin_object[key]
  }
}

/* **********************
 * operators and builtins
 * **********************/

export const binop_microcode: { [key: string]: (x: number, y: number) => any } = {
  '+': (x: number, y: number) => x + y,
  '*': (x: number, y: number) => x * y,
  '-': (x: number, y: number) => x - y,
  '/': (x: number, y: number) => x / y,
  '%': (x: number, y: number) => x % y,
  '<': (x: number, y: number) => x < y,
  '<=': (x: number, y: number) => x <= y,
  '>=': (x: number, y: number) => x >= y,
  '>': (x: number, y: number) => x > y,
  '===': (x: number, y: number) => x === y,
  '!==': (x: number, y: number) => x !== y
}
