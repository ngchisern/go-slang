import { LdcType } from '../../common/instruction'
import { GoLit, GoTag } from '../../common/types'
import {
  Blockframe_tag,
  Buffered_Channel_tag,
  Builtin_tag,
  Callframe_tag,
  Closure_tag,
  Environment_tag,
  False_tag,
  Frame_tag,
  Mutex_tag,
  Null_tag,
  Number_tag,
  Pair_tag,
  True_tag,
  Unassigned_tag,
  Unbuffered_Channel_tag,
  Undefined_tag,
  WaitGroup_tag,
  head,
  is_boolean,
  is_null,
  is_number,
  is_pair,
  is_undefined,
  tail
} from '../utils'
import { VMState } from '../vm'
import { isBuiltin } from 'module'
import { GoroutineState } from '../goroutine'
import { GoBlockMulti, IGoBlockBehavior } from '../types'
import { stat } from 'fs'

export const word_size = 8
const mega = 2 ** 20

export const memory_size = 5000

// update the size offset to 6
//  [1 byte tag, 4 bytes payload (depending on node type),
//  1 byte unused, 2 bytes #children]
const size_offset = 6

export interface Builtin {
  tag: 'BUILTIN'
  id: number
  arity: number
}

export interface MemoryState {
  data: ArrayBuffer | SharedArrayBuffer
  builtin_frame: number
  False: number
  True: number
  Undefined: number
  Unassigned: number
  Null: number

  // free data
  free_data?: number | SharedArrayBuffer
}

// TODO: No garbage collection yet
export abstract class Memory {
  dataView: DataView
  builtin_frame: number

  // literal values
  False: number
  True: number
  Undefined: number
  Unassigned: number
  Null: number

  builtin_array: Array<any>
  primitive_object: { [key: string]: Builtin }

  /**
   * abstract methods
   */
  abstract mem_make(bytes: number): void

  abstract set_memory(data: ArrayBuffer | SharedArrayBuffer): void

  abstract setUint8(address: number, value: number): void

  abstract setUint16(address: number, value: number): void

  abstract setUint64(address: number, value: number): void

  abstract getUint8(address: number): number

  abstract getUint16(address: number): number

  abstract getUint64(address: number): number

  abstract free(): number

  // Adds a value to the value at the given position in the array, returning the original value
  abstract increase_free(size: number): number

  abstract lock(state: VMState, goBlockBehavior: IGoBlockBehavior): number

  abstract unlock(state: VMState, goBlockBehavior: IGoBlockBehavior): Promise<number>

  abstract wg_add(state: VMState, goBlockBehavior: IGoBlockBehavior): number

  abstract wg_done(state: VMState, goBlockBehavior: IGoBlockBehavior): number

  abstract wg_wait(state: VMState, goBlockBehavior: IGoBlockBehavior): number

  abstract channel_send(state: VMState, goBlockBehavior: IGoBlockBehavior): Promise<number>

  abstract channel_receive(
    chan_addr: number,
    state: VMState,
    goBlockBehavior: IGoBlockBehavior
  ): Promise<number>

  constructor(state?: MemoryState) {
    if (state) {
      this.replicate(state)
    }

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
  }

  initialize(): void {
    this.mem_make(memory_size * word_size)
    this.builtin_frame = 0

    this.allocate_literal_values()
    this.allocate_builtin_frame()
    // TODO: constants
  }

  replicate = (state: MemoryState) => {
    this.dataView = new DataView(state.data)
    this.builtin_frame = state.builtin_frame
    this.False = state.False
    this.True = state.True
    this.Undefined = state.Undefined
    this.Unassigned = state.Unassigned
    this.Null = state.Null
  }

  public base_state(): MemoryState {
    return {
      data: this.dataView.buffer,
      builtin_frame: this.builtin_frame,
      False: this.False,
      True: this.True,
      Undefined: this.Undefined,
      Unassigned: this.Unassigned,
      Null: this.Null
    }
  }

  create_new_environment = (): number => {
    const non_empty_env = this.mem_allocate_Environment(0)
    return this.mem_Environment_extend(this.builtin_frame, non_empty_env)
  }

  allocate_builtin_frame = () => {
    const primitive_values = Object.values(this.primitive_object)
    const frame_address = this.mem_allocate_Frame(primitive_values.length)

    for (let i = 0; i < primitive_values.length; i++) {
      const builtin = primitive_values[i]
      this.mem_set_child(frame_address, i, this.mem_allocate_Builtin(builtin.id))
    }

    this.builtin_frame = frame_address
  }

  mem_allocate = (tag: number, size: number): number => {
    // console.log('free:', this.free(), 'size:', size, 'dataView.byteLength:', this.dataView.byteLength, 'word_size:', word_size)
    const current_free = this.increase_free(size)
    if (current_free + size >= this.dataView.byteLength / word_size) {
      throw new Error('Out of memory')
    }

    const address = current_free

    this.setUint8(address * word_size, tag)
    this.setUint16(address * word_size + size_offset, size)
    return address
  }

  // get and set a word in mem at given address
  mem_get = (address: number) => this.getUint64(address * word_size)

  mem_set = (address: number, x: number) => this.setUint64(address * word_size, x)

  // child index starts at 0
  mem_get_child = (address: number, child_index: number) => this.mem_get(address + 1 + child_index)

  mem_set_child = (address: number, child_index: number, value: number) =>
    this.mem_set(address + 1 + child_index, value)

  mem_get_tag = (address: number) => this.getUint8(address * word_size)

  mem_get_size = (address: number) => this.getUint16(address * word_size + size_offset)

  // access byte in mem, using address and offset
  mem_set_byte_at_offset = (address: number, offset: number, value: number) =>
    this.setUint8(address * word_size + offset, value)

  mem_get_byte_at_offset = (address: number, offset: number) =>
    this.getUint8(address * word_size + offset)

  // access byte in mem, using address and offset
  mem_set_2_bytes_at_offset = (address: number, offset: number, value: number) =>
    this.setUint16(address * word_size + offset, value)

  mem_get_2_bytes_at_offset = (address: number, offset: number) =>
    this.getUint16(address * word_size + offset)

  // boolean values carry their value (0 for false, 1 for true)
  // in the byte following the tag
  is_False = (address: number) => this.mem_get_tag(address) === False_tag

  is_True = (address: number) => this.mem_get_tag(address) === True_tag

  is_Boolean = (address: number) => this.is_True(address) || this.is_False(address)

  is_Null = (address: number) => this.mem_get_tag(address) === Null_tag

  is_Unassigned = (address: number) => this.mem_get_tag(address) === Unassigned_tag

  is_Undefined = (address: number) => this.mem_get_tag(address) === Undefined_tag

  allocate_literal_values = () => {
    this.False = this.mem_allocate(False_tag, 1)
    this.True = this.mem_allocate(True_tag, 1)
    this.Null = this.mem_allocate(Null_tag, 1)
    this.Unassigned = this.mem_allocate(Unassigned_tag, 1)
    this.Undefined = this.mem_allocate(Undefined_tag, 1)
  }

  // builtins: builtin id is encoded in second byte
  // [1 byte tag, 1 byte id, 3 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // Note: #children is 0
  is_Builtin = (address: number) => this.mem_get_tag(address) === Builtin_tag

  mem_allocate_Builtin = (id: number) => {
    const address = this.mem_allocate(Builtin_tag, 1)
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

  mem_allocate_Closure = (arity: number, pc: number, env: number) => {
    const address = this.mem_allocate(Closure_tag, 2)
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

  mem_allocate_Blockframe = (env: number) => {
    const address = this.mem_allocate(Blockframe_tag, 2)
    this.mem_set(address + 1, env)
    return address
  }

  mem_get_Blockframe_environment = (address: number) => this.mem_get_child(address, 0)

  is_Blockframe = (address: number) => this.mem_get_tag(address) === Blockframe_tag

  // call frame
  // [1 byte tag, 1 byte unused, 2 bytes pc,
  //  1 byte unused, 2 bytes #children, 1 byte unused]
  // followed by the address of env

  mem_allocate_Callframe = (env: number, pc: number) => {
    const address = this.mem_allocate(Callframe_tag, 2)
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

  mem_allocate_Frame = (number_of_values: number) =>
    this.mem_allocate(Frame_tag, number_of_values + 1)

  // environment
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by the addresses of its frames

  mem_allocate_Environment = (number_of_frames: number) =>
    this.mem_allocate(Environment_tag, number_of_frames + 1)

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
  mem_Environment_extend = (frame_address: number, env_address: number) => {
    const old_size = this.mem_get_size(env_address)
    const new_env_address = this.mem_allocate_Environment(old_size)
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
  mem_allocate_Pair = (hd: number, tl: number) => {
    const pair_address = this.mem_allocate(Pair_tag, 3)
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

  mem_allocate_Number = (n: number) => {
    const number_address = this.mem_allocate(Number_tag, 2)
    this.mem_set(number_address + 1, n)
    return number_address
  }

  is_Number = (address: number) => this.mem_get_tag(address) === Number_tag

  // Mutex
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by 1 boolean (locked), 1 owner
  // note: #children is 0

  mem_allocate_Mutex = () => {
    const mutex_address = this.mem_allocate(Mutex_tag, 3)
    this.mem_set(mutex_address + 1, 0)
    this.mem_set(mutex_address + 2, 0)
    return mutex_address
  }

  is_Mutex = (address: number) => this.mem_get_tag(address) === Mutex_tag

  // WaitGroup
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by 1 number (wait count)
  // note: #children is 0

  mem_allocate_WaitGroup = () => {
    const wg_address = this.mem_allocate(WaitGroup_tag, 2)
    this.mem_set(wg_address + 1, 0)
    return wg_address
  }

  is_WaitGroup = (address: number) => this.mem_get_tag(address) === WaitGroup_tag

  // Buffered Channel
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by 1 type, 1 buffer count (number), 1 slot-out, 1 lock
  // buffer size number of addresses
  // note: #children is 0

  mem_allocate_Buffered_Channel = (size: number, type: number) => {
    const ch_address = this.mem_allocate(Buffered_Channel_tag, 5 + Math.max(1, size))
    this.mem_set(ch_address + 1, type)
    this.mem_set(ch_address + 2, 0)
    this.mem_set(ch_address + 3, 0)
    this.mem_set(ch_address + 4, 0)
    return ch_address
  }

  is_Buffered_Channel = (address: number) => this.mem_get_tag(address) === Buffered_Channel_tag

  // Unbuffered Channel
  // [1 byte tag, 4 bytes unused,
  //  2 bytes #children, 1 byte unused]
  // followed by 1 type
  // note: #children is 0

  mem_allocate_Unbuffered_Channel = (type: number) => {
    const ch_address = this.mem_allocate(Unbuffered_Channel_tag, 2)
    this.mem_set(ch_address + 1, type)
    return ch_address
  }

  is_Unbuffered_Channel = (address: number) => this.mem_get_tag(address) === Unbuffered_Channel_tag

  // Channel

  mem_allocate_Channel = (size: number, type: number) =>
    size === 0
      ? this.mem_allocate_Unbuffered_Channel(type)
      : this.mem_allocate_Buffered_Channel(size, type)

  is_Channel = (address: number) =>
    this.is_Buffered_Channel(address) || this.is_Unbuffered_Channel(address)

  unop_microcode: {
    [key: string]: (x: number, state: VMState, goBlockBehavior: IGoBlockBehavior) => Promise<number>
  } = {
    '<-': async (chan_addr: number, state: VMState, goBlockBehavior) => {
      if (!this.is_Channel(chan_addr)) {
        throw new Error('unop: not a channel')
      }

      return await this.channel_receive(chan_addr, state, goBlockBehavior)
    }
  }

  binop_microcode: { [key: string]: (x: number, y: number) => GoLit } = {
    '+': (x: number, y: number) => ({ tag: GoTag.Int, val: x + y }),
    '*': (x: number, y: number) => ({ tag: GoTag.Int, val: x * y }),
    '-': (x: number, y: number) => ({ tag: GoTag.Int, val: x - y }),
    '/': (x: number, y: number) => ({ tag: GoTag.Int, val: x / y }),
    '%': (x: number, y: number) => ({ tag: GoTag.Int, val: x % y }),
    '<': (x: number, y: number) => ({ tag: GoTag.Boolean, val: x < y }),
    '<=': (x: number, y: number) => ({ tag: GoTag.Boolean, val: x <= y }),
    '>=': (x: number, y: number) => ({ tag: GoTag.Boolean, val: x >= y }),
    '>': (x: number, y: number) => ({ tag: GoTag.Boolean, val: x > y }),
    '===': (x: number, y: number) => ({ tag: GoTag.Boolean, val: x === y }),
    '!==': (x: number, y: number) => ({ tag: GoTag.Boolean, val: x !== y })
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
                    : console.error('unknown word tag during address to JS value conversion:' + x)

  JS_value_to_address = (x: LdcType): any =>
    x === undefined
      ? this.Undefined
      : x.tag === GoTag.Boolean
        ? x.val
          ? this.True
          : this.False
        : x.tag === GoTag.Int
          ? this.mem_allocate_Number(x.val ? x.val : 0)
          : x.tag == GoTag.Mutex
            ? this.mem_allocate_Mutex()
            : x.tag == GoTag.WaitGroup
              ? this.mem_allocate_WaitGroup()
              : x.tag == GoTag.Channel
                ? this.mem_allocate_Channel(
                    0,
                    x.type === GoTag.Int
                      ? Number_tag
                      : x.type === GoTag.Boolean
                        ? True_tag
                        : Null_tag
                  )
                : console.error('unknown JS value during JS value to address conversion:' + x)

  /**
   * Builtins
   */
  // in this machine, the builtins take their
  // arguments directly from the operand stack,
  // to save the creation of an intermediate
  // argument array
  builtin_object: { [key: string]: (state: VMState, goBlockBehavior: IGoBlockBehavior) => any } = {
    make: state => {
      const addr = state.OS.pop()
      if (this.is_Channel(addr)) {
        // unbuffered channel
        return this.mem_allocate_Channel(0, this.mem_get(addr + 3))
      }

      const size = this.address_to_JS_value(addr)
      const addr2 = state.OS.pop()

      if (!this.is_Channel(addr2) || size < 0) {
        throw new Error('make: not a channel')
      }

      return this.mem_allocate_Channel(size, this.mem_get(addr + 3))
    },
    Println: state => {
      const address = state.OS.pop()
      console.log(this.address_to_JS_value(address))
      state.OS.pop()
      return address
    },
    Lock: (state, goBlockBehavior) => {
      return this.lock(state, goBlockBehavior)
    },
    Unlock: async (state, goBlockBehavior) => {
      return await this.unlock(state, goBlockBehavior)
    },
    Add: (state, goBlockBehavior) => {
      return this.wg_add(state, goBlockBehavior)
    },
    Done: (state, goBlockBehavior) => {
      return this.wg_done(state, goBlockBehavior)
    },
    Wait: (state, goBlockBehavior) => {
      return this.wg_wait(state, goBlockBehavior)
    }
  }
}
