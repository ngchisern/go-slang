import { error } from 'console'
import {
  Blockframe_tag,
  Builtin_tag,
  Callframe_tag,
  Closure_tag,
  Environment_tag,
  False_tag,
  Frame_tag,
  Null_tag,
  Number_tag,
  Pair_tag,
  True_tag,
  Unassigned_tag,
  Undefined_tag,
  head,
  is_boolean,
  is_null,
  is_number,
  is_pair,
  is_undefined,
  mem_make,
  tail
} from './utils'

export const word_size = 8
const mega = 2 ** 20

const memory_size = 3000
const block_size = 1000

export interface Block {
  position: number // in word
  free: number
  size: number
}

const size_offset = 5

export interface Builtin {
  tag: 'BUILTIN'
  id: number
  arity: number
}

// TODO: No garbage collection yet
/**
 * Memory layout:
 * 0: HEAP block
 * 1..end: STACK blocks
 *
 * STACK blocks start at the end of the memory and grow upwards.
 */
export class Memory {
  private data: DataView
  private blocks: Array<Block | null>
  private builtin_frame: number

  // literal values
  False: number
  True: number
  Undefined: number
  Unassigned: number
  Null: number

  builtin_array: Array<any>
  primitive_object: { [key: string]: Builtin }

  constructor() {
    this.data = mem_make(memory_size * word_size)
    this.blocks = []
    this.builtin_frame = 0

    const block_num = memory_size / block_size
    // initialize the memory with empty blocks
    for (let i = 0; i < block_num; i++) {
      this.blocks.push(null)
    }

    // HEAP block
    this.blocks[0] = { position: 0, size: block_size, free: 0 }

    this.allocate_literal_values(this.blocks[0])
    this.allocate_builtin_frame(this.blocks[0])
    // TODO: constants
  }

  get_block = (blockId: number): Block => {
    const idx = this.blocks.length - blockId
    if (this.blocks[idx] === null) {
      error('block not allocated')
    }
    return this.blocks[idx] as Block
  }

  copy_block = (from: number, to: number): Block => {
    const from_idx = this.blocks.length - from
    const to_idx = this.blocks.length - to
    this.blocks[to_idx] = this.blocks[from_idx]
    return this.blocks[to_idx] as Block
  }

  create_new_environment = (blockId: number): number => {
    const idx = this.blocks.length - blockId
    const addr = idx * block_size
    this.blocks[idx] = { position: addr, size: block_size, free: 0 }
    const block = this.blocks[idx] as Block

    const non_empty_env = this.mem_allocate_Environment(block, 0)
    return this.mem_Environment_extend(block, this.builtin_frame, non_empty_env)
  }

  allocate_builtin_frame = (block: Block) => {
    this.primitive_object = {}
    this.builtin_array = []
    {
      let i = 0
      for (const key in this.builtin_object) {
        this.primitive_object[key] = {
          tag: 'BUILTIN',
          id: i,
          arity: 1
        }
        this.builtin_array[i++] = this.builtin_object[key]
      }
    }

    const primitive_values = Object.values(this.primitive_object)
    const frame_address = this.mem_allocate_Frame(block, primitive_values.length)

    for (let i = 0; i < primitive_values.length; i++) {
      const builtin = primitive_values[i]
      this.mem_set_child(frame_address, i, this.mem_allocate_Builtin(block, builtin.id))
    }

    this.builtin_frame = frame_address
  }

  mem_allocate = (block: Block, tag: number, size: number): number => {
    if (block.free + size >= block.size) {
      throw new Error('Out of memory')
    }

    const address = block.position + block.free
    block.free += size

    this.data.setUint8(address * word_size, tag)
    this.data.setUint16(address * word_size + size_offset, size)
    return address
  }

  // get and set a word in mem at given address
  mem_get = (address: number) => this.data.getFloat64(address * word_size)

  mem_set = (address: number, x: number) => this.data.setFloat64(address * word_size, x)

  // child index starts at 0
  mem_get_child = (address: number, child_index: number) => this.mem_get(address + 1 + child_index)

  mem_set_child = (address: number, child_index: number, value: number) =>
    this.mem_set(address + 1 + child_index, value)

  mem_get_tag = (address: number) => this.data.getUint8(address * word_size)

  mem_get_size = (address: number) => this.data.getUint16(address * word_size + size_offset)

  // access byte in mem, using address and offset
  mem_set_byte_at_offset = (address: number, offset: number, value: number) =>
    this.data.setUint8(address * word_size + offset, value)

  mem_get_byte_at_offset = (address: number, offset: number) =>
    this.data.getUint8(address * word_size + offset)

  // access byte in mem, using address and offset
  mem_set_2_bytes_at_offset = (address: number, offset: number, value: number) =>
    this.data.setUint16(address * word_size + offset, value)

  mem_get_2_bytes_at_offset = (address: number, offset: number) =>
    this.data.getUint16(address * word_size + offset)

  // boolean values carry their value (0 for false, 1 for true)
  // in the byte following the tag
  is_False = (address: number) => this.mem_get_tag(address) === False_tag

  is_True = (address: number) => this.mem_get_tag(address) === True_tag

  is_Boolean = (address: number) => this.is_True(address) || this.is_False(address)

  is_Null = (address: number) => this.mem_get_tag(address) === Null_tag

  is_Unassigned = (address: number) => this.mem_get_tag(address) === Unassigned_tag

  is_Undefined = (address: number) => this.mem_get_tag(address) === Undefined_tag

  allocate_literal_values = (block: Block) => {
    this.False = this.mem_allocate(block, False_tag, 1)
    this.True = this.mem_allocate(block, True_tag, 1)
    this.Null = this.mem_allocate(block, Null_tag, 1)
    this.Unassigned = this.mem_allocate(block, Unassigned_tag, 1)
    this.Undefined = this.mem_allocate(block, Undefined_tag, 1)
  }

  // builtins: builtin id is encoded in second byte
  // [1 byte tag, 1 byte id, 3 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // Note: #children is 0
  is_Builtin = (address: number) => this.mem_get_tag(address) === Builtin_tag

  mem_allocate_Builtin = (block: Block, id: number) => {
    const address = this.mem_allocate(block, Builtin_tag, 1)
    this.mem_set_byte_at_offset(address, 1, id)
    return address
  }

  mem_get_Builtin_id = (address: number) => this.mem_get_byte_at_offset(address, 1)

  // closure
  // [1 byte tag, 1 byte arity, 2 bytes pc, 1 byte unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the address of env
  // note: currently bytes at offset 4 and 7 are not used;
  //   they could be used to increase pc and #children range

  mem_allocate_Closure = (block: Block, arity: number, pc: number, env: number) => {
    const address = this.mem_allocate(block, Closure_tag, 2)
    this.mem_set_byte_at_offset(address, 1, arity)
    this.mem_set_2_bytes_at_offset(address, 2, pc)
    this.mem_set(address + 1, env)
    return address
  }

  mem_get_Closure_arity = (address: number) => this.mem_get_byte_at_offset(address, 1)

  mem_get_Closure_pc = (address: number) => this.mem_get_2_bytes_at_offset(address, 2)

  mem_get_Closure_environment = (address: number) => this.mem_get_child(address, 0)

  is_Closure = (address: number) => this.mem_get_tag(address) === Closure_tag

  // block frame
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]

  mem_allocate_Blockframe = (block: Block, env: number) => {
    const address = this.mem_allocate(block, Blockframe_tag, 2)
    this.mem_set(address + 1, env)
    return address
  }

  mem_get_Blockframe_environment = (address: number) => this.mem_get_child(address, 0)

  is_Blockframe = (address: number) => this.mem_get_tag(address) === Blockframe_tag

  // call frame
  // [1 byte tag, 1 byte unused, 2 bytes pc,
  //  1 byte unused, 2 bytes #children, 1 byte unused]
  // followed by the address of env

  mem_allocate_Callframe = (block: Block, env: number, pc: number) => {
    const address = this.mem_allocate(block, Callframe_tag, 2)
    this.mem_set_2_bytes_at_offset(address, 2, pc)
    this.mem_set(address + 1, env)
    return address
  }

  mem_get_Callframe_environment = (address: number) => this.mem_get_child(address, 0)

  mem_get_Callframe_pc = (address: number) => this.mem_get_2_bytes_at_offset(address, 2)

  is_Callframe = (address: number) => this.mem_get_tag(address) === Callframe_tag

  // environment frame
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the addresses of its values

  mem_allocate_Frame = (block: Block, number_of_values: number) =>
    this.mem_allocate(block, Frame_tag, number_of_values + 1)

  // environment
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the addresses of its frames

  mem_allocate_Environment = (block: Block, number_of_frames: number) =>
    this.mem_allocate(block, Environment_tag, number_of_frames + 1)

  // access environment given by address
  // using a "position", i.e. a pair of
  // frame index and value index
  mem_get_Environment_value = (env_address: number, position: [number, number]) => {
    const [frame_index, value_index] = position
    const frame_address = this.mem_get_child(env_address, frame_index)
    return this.mem_get_child(frame_address, value_index)
  }

  mem_set_Environment_value = (env_address: number, position: [number, number], value: number) => {
    //display(env_address, "env_address:")
    const [frame_index, value_index] = position
    const frame_address = this.mem_get_child(env_address, frame_index)
    this.mem_set_child(frame_address, value_index, value)
  }

  // extend a given environment by a new frame:
  // create a new environment that is bigger by 1
  // frame slot than the given environment.
  // copy the frame Addresses of the given
  // environment to the new environment.
  // enter the address of the new frame to end
  // of the new environment
  mem_Environment_extend = (block: Block, frame_address: number, env_address: number) => {
    const old_size = this.mem_get_size(env_address)
    const new_env_address = this.mem_allocate_Environment(block, old_size)
    let i
    for (i = 0; i < old_size - 1; i++) {
      this.mem_set_child(new_env_address, i, this.mem_get_child(env_address, i))
    }
    this.mem_set_child(new_env_address, i, frame_address)
    return new_env_address
  }

  // pair
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by head and tail addresses, one word each
  mem_allocate_Pair = (block: Block, hd: number, tl: number) => {
    const pair_address = this.mem_allocate(block, Pair_tag, 3)
    this.mem_set_child(pair_address, 0, hd)
    this.mem_set_child(pair_address, 1, tl)
    return pair_address
  }

  is_Pair = (address: number) => this.mem_get_tag(address) === Pair_tag

  // number
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the number, one word
  // note: #children is 0

  mem_allocate_Number = (block: Block, n: number) => {
    const number_address = this.mem_allocate(block, Number_tag, 2)
    this.mem_set(number_address + 1, n)
    return number_address
  }

  is_Number = (address: number) => this.mem_get_tag(address) === Number_tag

  binop_microcode: { [key: string]: (x: number, y: number) => any } = {
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

  // conversions between addresses and JS_value
  address_to_JS_value = (x: number): any =>
    this.is_Boolean(x)
      ? this.is_True(x)
        ? true
        : false
      : this.is_Number(x)
        ? this.mem_get(x + 1)
        : this.is_Undefined(x)
          ? undefined
          : this.is_Unassigned(x)
            ? '<unassigned>'
            : this.is_Null(x)
              ? null
              : this.is_Pair(x)
                ? [
                    this.address_to_JS_value(this.mem_get_child(x, 0)),
                    this.address_to_JS_value(this.mem_get_child(x, 1))
                  ]
                : this.is_Closure(x)
                  ? '<closure>'
                  : this.is_Builtin(x)
                    ? '<builtin>'
                    : error('unknown word tag during address to JS value conversion:')

  JS_value_to_address = (block_id: number, x: any): any =>
    is_boolean(x)
      ? x
        ? this.True
        : this.False
      : is_number(x)
        ? this.mem_allocate_Number(this.get_block(block_id), x)
        : is_undefined(x)
          ? this.is_Undefined
          : is_null(x)
            ? this.Null
            : is_pair(x)
              ? this.mem_allocate_Pair(
                  this.get_block(block_id),
                  this.JS_value_to_address(block_id, head(x)),
                  this.JS_value_to_address(block_id, tail(x))
                )
              : error('unknown JS value during JS value to address conversion:')

  /**
   * Builtins
   */
  // in this machine, the builtins take their
  // arguments directly from the operand stack,
  // to save the creation of an intermediate
  // argument array
  builtin_object: { [key: string]: (OS: Array<any>) => any } = {
    'fmt.Println': OS => {
      const address = OS.pop()
      console.log(this.address_to_JS_value(address))
      return address
    }
  }
}
