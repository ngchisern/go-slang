import { error } from 'console'
import {
  False,
  Block,
  Null,
  True,
  allocate_literal_values,
  builtin_array,
  is_Boolean,
  is_Builtin,
  is_Closure,
  is_Null,
  is_Number,
  is_Pair,
  is_True,
  is_Unassigned,
  is_Undefined,
  mem_Environment_extend,
  mem_allocate_Builtin,
  mem_allocate_Environment,
  mem_allocate_Frame,
  mem_allocate_Number,
  mem_allocate_Pair,
  mem_get,
  mem_get_child,
  mem_set_child,
  primitive_object,
  word_size
} from './block'

const mem_make = (bytes: number): DataView => {
  if (bytes % 8 !== 0) {
    error('mem bytes must be divisible by 8')
  }
  const data = new ArrayBuffer(bytes)
  const view = new DataView(data)
  return view
}

// TODO: No garbage collection yet
/**
 * Memory layout:
 * 0: HEAP block
 * 1..end: STACK blocks
 *
 * STACK blocks start at the end of the memory and grow upwards.
 */
export let memory: DataView
const memory_size = 125000

let blocks: Array<Block | null> = []
const block_size = 1000 // (in words); dummy value

let builtin_frame: number

export const initialize_memory = (): void => {
  memory = mem_make(memory_size * word_size)

  // initialize the memory with empty blocks
  for (let i = 0; i < memory_size / block_size; i++) {
    blocks.push(null)
  }

  // HEAP block
  blocks[0] = { position: 0, size: block_size, free: 0 }

  allocate_literal_values(blocks[0])
  allocate_builtin_frame(blocks[0])
  // TODO: constants
}

export const get_block = (blockId: number): Block => {
  if (blocks[blocks.length - blockId] === null) {
    error('block not allocated')
  }
  return blocks[blocks.length - blockId] as Block
}

export const create_new_environment = (blockId: number): number => {
  const addr = (blocks.length - blockId) * block_size
  blocks[blocks.length - blockId] = { position: addr, size: block_size, free: 0 }
  const block = blocks[blocks.length - blockId] as Block

  const non_empty_env = mem_allocate_Environment(block, 0)
  return mem_Environment_extend(block, builtin_frame, non_empty_env)
}

const allocate_builtin_frame = (block: Block) => {
  const primitive_values = Object.values(primitive_object)
  const frame_address = mem_allocate_Frame(block, primitive_values.length)

  for (let i = 0; i < primitive_values.length; i++) {
    const builtin = primitive_values[i]
    mem_set_child(frame_address, i, mem_allocate_Builtin(block, builtin.id))
  }

  builtin_frame = frame_address
}

// conversions between addresses and JS_value
// TODO: return type
export const address_to_JS_value = (x: number): any =>
  is_Boolean(x)
    ? is_True(x)
      ? true
      : false
    : is_Number(x)
      ? mem_get(x + 1)
      : is_Undefined(x)
        ? undefined
        : is_Unassigned(x)
          ? '<unassigned>'
          : is_Null(x)
            ? null
            : is_Pair(x)
              ? [address_to_JS_value(mem_get_child(x, 0)), address_to_JS_value(mem_get_child(x, 1))]
              : is_Closure(x)
                ? '<closure>'
                : is_Builtin(x)
                  ? '<builtin>'
                  : error('unknown word tag during address to JS value conversion:')

export const JS_value_to_address = (block_id: number, x: any): any =>
  is_boolean(x)
    ? x
      ? True
      : False
    : is_number(x)
      ? mem_allocate_Number(get_block(block_id), x)
      : is_undefined(x)
        ? is_Undefined
        : is_null(x)
          ? Null
          : is_pair(x)
            ? mem_allocate_Pair(
                get_block(block_id),
                JS_value_to_address(block_id, head(x)),
                JS_value_to_address(block_id, tail(x))
              )
            : error('unknown JS value during JS value to address conversion:')

const is_boolean = (x: any) => typeof x === 'boolean'

const is_number = (x: any) => typeof x === 'number'

const is_undefined = (x: any) => x === undefined

const is_null = (x: any) => x === null

const is_pair = (x: any) => Array.isArray(x) && x.length === 2

const head = (x: any) => x[0]

const tail = (x: any) => x[1]
