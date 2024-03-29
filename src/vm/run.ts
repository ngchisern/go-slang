import { error } from 'console'
import {
  Instruction,
  Goto,
  Ldc,
  Binop,
  Pop,
  EnterScope,
  ExitScope,
  Ld,
  Assign,
  Ldf,
  Call,
  Reset
} from '../common/instruction'
import {
  Builtin,
  False,
  JS_value_to_address,
  True,
  Unassigned,
  Undefined,
  address_to_JS_value,
  binop_microcode,
  builtin_array,
  builtin_object,
  heap_Environment_extend,
  heap_allocate_Blockframe,
  heap_allocate_Builtin,
  heap_allocate_Callframe,
  heap_allocate_Closure,
  heap_allocate_Environment,
  heap_allocate_Frame,
  heap_allocate_Number,
  heap_allocate_Pair,
  heap_get_Blockframe_environment,
  heap_get_Builtin_id,
  heap_get_Callframe_environment,
  heap_get_Callframe_pc,
  heap_get_Closure_environment,
  heap_get_Closure_pc,
  heap_get_Environment_value,
  heap_get_child,
  heap_set_Environment_value,
  heap_set_child,
  is_Boolean,
  is_Builtin,
  is_Callframe,
  is_Closure,
  is_Null,
  is_Number,
  is_Pair,
  is_Unassigned,
  is_Undefined,
  primitive_object
} from './memory'

/* **************************
 * VM
 * **************************/

let OS: Array<any>
let RTS: Array<any>
let E: number
let PC: number

let instrs: Instruction[]

// creating global runtime environment
const primitive_values = Object.values(primitive_object)
const frame_address = heap_allocate_Frame(primitive_values.length)
for (let i = 0; i < primitive_values.length; i++) {
  const primitive_value = primitive_values[i]
  if (typeof primitive_value === 'object' && primitive_value.hasOwnProperty('id')) {
    heap_set_child(frame_address, i, heap_allocate_Builtin(primitive_value.id))
  } else if (typeof primitive_value === 'undefined') {
    heap_set_child(frame_address, i, Undefined)
  } else {
    error('constant value not supported')
  }
}

const heap_empty_Environment = heap_allocate_Environment(0)

const global_environment = heap_Environment_extend(frame_address, heap_empty_Environment)

export const run = (vm_instrs: Instruction[]) => {
  OS = []
  RTS = []
  E = global_environment
  PC = 0

  instrs = vm_instrs

  while (!(instrs[PC].tag === 'DONE')) {
    const instr = instrs[PC++]
    microcode[instr.tag](instr)
  }

  return
}

const microcode: { [type: string]: (instr: Instruction) => void } = {
  LDC: (instr: Ldc) => OS.push(JS_value_to_address(instr.val)),
  BINOP: (instr: Binop) => OS.push(apply_binop(instr.sym, OS.pop(), OS.pop())),
  POP: (instr: Pop) => OS.pop(),
  GOTO: (instr: Goto) => (PC = instr.addr),
  ENTER_SCOPE: (instr: EnterScope) => {
    RTS.push(heap_allocate_Blockframe(E))
    const frame_address = heap_allocate_Frame(instr.syms.length)
    E = heap_Environment_extend(frame_address, E)
    const locals = instr.syms
    for (let i = 0; i < locals.length; i++) {
      heap_set_child(frame_address, i, Unassigned)
    }
  },
  EXIT_SCOPE: (instr: ExitScope) => (E = heap_get_Blockframe_environment(RTS.pop())),
  LD: (instr: Ld) => {
    const val = heap_get_Environment_value(E, instr.pos)
    if (is_Unassigned(val)) error('access of unassigned variable')
    OS.push(val)
  },
  ASSIGN: (instr: Assign) => heap_set_Environment_value(E, instr.pos, OS[OS.length - 1]),
  LDF: (instr: Ldf) => {
    const arity = instr.prms.length
    const closure_address = heap_allocate_Closure(arity, instr.addr, E)
    OS.push(closure_address)
  },
  CALL: (instr: Call) => {
    const arity = instr.arity
    const fun = OS[OS.length - 1 - arity]
    if (is_Builtin(fun)) {
      return apply_builtin(heap_get_Builtin_id(fun))
    }
    const frame_address = heap_allocate_Frame(arity)
    for (let i = arity - 1; i >= 0; i--) {
      heap_set_child(frame_address, i, OS.pop())
    }
    OS.pop() // pop fun
    RTS.push(heap_allocate_Callframe(E, PC))
    E = heap_Environment_extend(frame_address, heap_get_Closure_environment(fun))
    PC = heap_get_Closure_pc(fun)
  },
  RESET: (instr: Reset) => {
    PC--
    // keep popping...
    const top_frame = RTS.pop()
    if (is_Callframe(top_frame)) {
      // ...until top frame is a call frame
      PC = heap_get_Callframe_pc(top_frame)
      E = heap_get_Callframe_environment(top_frame)
    }
  }
}

const apply_binop = (op: string, v2: number, v1: number) =>
  JS_value_to_address(binop_microcode[op](address_to_JS_value(v1), address_to_JS_value(v2)))

const apply_builtin = (builtin_id: number) => {
  const result = builtin_array[builtin_id](OS)
  OS.pop() // pop fun
  OS.push(result)
}
