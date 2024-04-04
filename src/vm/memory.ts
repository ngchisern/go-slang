const word_size = 8
const mega = 2 ** 20

const heap_make = (bytes: number): DataView => {
  if (bytes % 8 !== 0) {
    console.error('heap bytes must be divisible by 8')
  }
  const data = new ArrayBuffer(bytes)
  const view = new DataView(data)
  return view
}

let HEAP = heap_make(1000000)

let free = 0

const size_offset = 5
const heap_allocate = (tag: number, size: number): number => {
  const address = free
  free += size
  HEAP.setUint8(address * word_size, tag)
  HEAP.setUint16(address * word_size + size_offset, size)
  return address
}

// get and set a word in heap at given address
const heap_get = (address: number) => HEAP.getFloat64(address * word_size)

const heap_set = (address: number, x: number) => HEAP.setFloat64(address * word_size, x)

// child index starts at 0
export const heap_get_child = (address: number, child_index: number) =>
  heap_get(address + 1 + child_index)

export const heap_set_child = (address: number, child_index: number, value: number) =>
  heap_set(address + 1 + child_index, value)

const heap_get_tag = (address: number) => HEAP.getUint8(address * word_size)

const heap_get_size = (address: number) => HEAP.getUint16(address * word_size + size_offset)

// access byte in heap, using address and offset
const heap_set_byte_at_offset = (address: number, offset: number, value: number) =>
  HEAP.setUint8(address * word_size + offset, value)

const heap_get_byte_at_offset = (address: number, offset: number) =>
  HEAP.getUint8(address * word_size + offset)

// access byte in heap, using address and offset
const heap_set_2_bytes_at_offset = (address: number, offset: number, value: number) =>
  HEAP.setUint16(address * word_size + offset, value)

const heap_get_2_bytes_at_offset = (address: number, offset: number) =>
  HEAP.getUint16(address * word_size + offset)

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
export const False = heap_allocate(False_tag, 1)
export const is_False = (address: number) => heap_get_tag(address) === False_tag
export const True = heap_allocate(True_tag, 1)
export const is_True = (address: number) => heap_get_tag(address) === True_tag

export const is_Boolean = (address: number) => is_True(address) || is_False(address)

const Null = heap_allocate(Null_tag, 1)
export const is_Null = (address: number) => heap_get_tag(address) === Null_tag

export const Unassigned = heap_allocate(Unassigned_tag, 1)
export const is_Unassigned = (address: number) => heap_get_tag(address) === Unassigned_tag

export const Undefined = heap_allocate(Undefined_tag, 1)
export const is_Undefined = (address: number) => heap_get_tag(address) === Undefined_tag

// builtins: builtin id is encoded in second byte
// [1 byte tag, 1 byte id, 3 bytes unused,
//  2 bytes #children, 1 byte unused]
// Note: #children is 0

export const is_Builtin = (address: number) => heap_get_tag(address) === Builtin_tag

export const heap_allocate_Builtin = (id: number) => {
  const address = heap_allocate(Builtin_tag, 1)
  heap_set_byte_at_offset(address, 1, id)
  return address
}

export const heap_get_Builtin_id = (address: number) => heap_get_byte_at_offset(address, 1)

// closure
// [1 byte tag, 1 byte arity, 2 bytes pc, 1 byte unused,
//  2 bytes #children, 1 byte unused]
// followed by the address of env
// note: currently bytes at offset 4 and 7 are not used;
//   they could be used to increase pc and #children range

export const heap_allocate_Closure = (arity: number, pc: number, env: number) => {
  const address = heap_allocate(Closure_tag, 2)
  heap_set_byte_at_offset(address, 1, arity)
  heap_set_2_bytes_at_offset(address, 2, pc)
  heap_set(address + 1, env)
  return address
}

const heap_get_Closure_arity = (address: number) => heap_get_byte_at_offset(address, 1)

export const heap_get_Closure_pc = (address: number) => heap_get_2_bytes_at_offset(address, 2)

export const heap_get_Closure_environment = (address: number) => heap_get_child(address, 0)

export const is_Closure = (address: number) => heap_get_tag(address) === Closure_tag

// block frame
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]

export const heap_allocate_Blockframe = (env: number) => {
  const address = heap_allocate(Blockframe_tag, 2)
  heap_set(address + 1, env)
  return address
}

export const heap_get_Blockframe_environment = (address: number) => heap_get_child(address, 0)

const is_Blockframe = (address: number) => heap_get_tag(address) === Blockframe_tag

// call frame
// [1 byte tag, 1 byte unused, 2 bytes pc,
//  1 byte unused, 2 bytes #children, 1 byte unused]
// followed by the address of env

export const heap_allocate_Callframe = (env: number, pc: number) => {
  const address = heap_allocate(Callframe_tag, 2)
  heap_set_2_bytes_at_offset(address, 2, pc)
  heap_set(address + 1, env)
  return address
}

export const heap_get_Callframe_environment = (address: number) => heap_get_child(address, 0)

export const heap_get_Callframe_pc = (address: number) => heap_get_2_bytes_at_offset(address, 2)

export const is_Callframe = (address: number) => heap_get_tag(address) === Callframe_tag

// environment frame
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the addresses of its values

export const heap_allocate_Frame = (number_of_values: number) =>
  heap_allocate(Frame_tag, number_of_values + 1)

// environment
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the addresses of its frames

export const heap_allocate_Environment = (number_of_frames: number) =>
  heap_allocate(Environment_tag, number_of_frames + 1)

const heap_empty_Environment = heap_allocate_Environment(0)

// access environment given by address
// using a "position", i.e. a pair of
// frame index and value index
export const heap_get_Environment_value = (env_address: number, position: [number, number]) => {
  const [frame_index, value_index] = position
  const frame_address = heap_get_child(env_address, frame_index)
  return heap_get_child(frame_address, value_index)
}

export const heap_set_Environment_value = (
  env_address: number,
  position: [number, number],
  value: number
) => {
  //display(env_address, "env_address:")
  const [frame_index, value_index] = position
  const frame_address = heap_get_child(env_address, frame_index)
  heap_set_child(frame_address, value_index, value)
}

// extend a given environment by a new frame:
// create a new environment that is bigger by 1
// frame slot than the given environment.
// copy the frame Addresses of the given
// environment to the new environment.
// enter the address of the new frame to end
// of the new environment
export const heap_Environment_extend = (frame_address: number, env_address: number) => {
  const old_size = heap_get_size(env_address)
  const new_env_address = heap_allocate_Environment(old_size)
  let i
  for (i = 0; i < old_size - 1; i++) {
    heap_set_child(new_env_address, i, heap_get_child(env_address, i))
  }
  heap_set_child(new_env_address, i, frame_address)
  return new_env_address
}

// pair
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by head and tail addresses, one word each
export const heap_allocate_Pair = (hd: number, tl: number) => {
  const pair_address = heap_allocate(Pair_tag, 3)
  heap_set_child(pair_address, 0, hd)
  heap_set_child(pair_address, 1, tl)
  return pair_address
}

export const is_Pair = (address: number) => heap_get_tag(address) === Pair_tag

// number
// [1 byte tag, 4 bytes unused,
//  2 bytes #children, 1 byte unused]
// followed by the number, one word
// note: #children is 0

export const heap_allocate_Number = (n: number) => {
  const number_address = heap_allocate(Number_tag, 2)
  heap_set(number_address + 1, n)
  return number_address
}

export const is_Number = (address: number) => heap_get_tag(address) === Number_tag

//
// conversions between addresses and JS_value
//

// TODO: return type
export const address_to_JS_value = (x: number): any =>
  is_Boolean(x)
    ? is_True(x)
      ? true
      : false
    : is_Number(x)
      ? heap_get(x + 1)
      : is_Undefined(x)
        ? undefined
        : is_Unassigned(x)
          ? '<unassigned>'
          : is_Null(x)
            ? null
            : is_Pair(x)
              ? [
                  address_to_JS_value(heap_get_child(x, 0)),
                  address_to_JS_value(heap_get_child(x, 1))
                ]
              : is_Closure(x)
                ? '<closure>'
                : is_Builtin(x)
                  ? '<builtin>'
                  : console.error('unknown word tag during address to JS value conversion:')

export const JS_value_to_address = (x: any): any =>
  is_boolean(x)
    ? x
      ? True
      : False
    : is_number(x)
      ? heap_allocate_Number(x)
      : is_undefined(x)
        ? Undefined
        : is_null(x)
          ? Null
          : is_pair(x)
            ? heap_allocate_Pair(JS_value_to_address(head(x)), JS_value_to_address(tail(x)))
            : console.error('unknown JS value during JS value to address conversion:')

const is_boolean = (x: any) => typeof x === 'boolean'

const is_number = (x: any) => typeof x === 'number'

const is_undefined = (x: any) => x === undefined

const is_null = (x: any) => x === null

const is_pair = (x: any) => Array.isArray(x) && x.length === 2

const head = (x: any) => x[0]

const tail = (x: any) => x[1]

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
  display: OS => {
    const address = OS.pop()
    console.log(address_to_JS_value(address))
    return address
  },
  'fmt.Println': OS => {
    const address = OS.pop()
    console.log(address_to_JS_value(address))
    return address
  },
  error: OS => console.error(address_to_JS_value(OS.pop())),
  is_number: OS => (is_Number(OS.pop()) ? True : False),
  is_boolean: OS => (is_Boolean(OS.pop()) ? True : False),
  is_undefined: OS => (is_Undefined(OS.pop()) ? True : False),
  is_function: OS => is_Closure(OS.pop()),
  pair: OS => {
    const tl = OS.pop()
    const hd = OS.pop()
    return heap_allocate_Pair(hd, tl)
  },
  is_pair: OS => (is_Pair(OS.pop()) ? True : False),
  head: OS => heap_get_child(OS.pop(), 0),
  tail: OS => heap_get_child(OS.pop(), 1),
  is_null: OS => (is_Null(OS.pop()) ? True : False),
  set_head: OS => {
    const val = OS.pop()
    const p = OS.pop()
    heap_set_child(p, 0, val)
  },
  set_tail: OS => {
    const val = OS.pop()
    const p = OS.pop()
    heap_set_child(p, 1, val)
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
      arity: 1 // all builtins take 0 arguments
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
