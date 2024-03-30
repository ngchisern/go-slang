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
  Unassigned,
  Undefined,
  binop_microcode,
  builtin_array,
  builtin_object,
  mem_Environment_extend,
  mem_allocate_Blockframe,
  mem_allocate_Builtin,
  mem_allocate_Callframe,
  mem_allocate_Closure,
  mem_allocate_Environment,
  mem_allocate_Frame,
  mem_allocate_Number,
  mem_allocate_Pair,
  mem_get_Blockframe_environment,
  mem_get_Builtin_id,
  mem_get_Callframe_environment,
  mem_get_Callframe_pc,
  mem_get_Closure_environment,
  mem_get_Closure_pc,
  mem_get_Environment_value,
  mem_get_child,
  mem_set_Environment_value,
  mem_set_child,
  is_Boolean,
  is_Builtin,
  is_Callframe,
  is_Closure,
  is_Number,
  is_Pair,
  is_Unassigned,
  primitive_object
} from './block'
import {
  JS_value_to_address,
  address_to_JS_value,
  create_new_environment,
  get_block,
  initialize_memory
} from './memory'

/* **************************
 * VM
 * **************************/

let OS: Array<any>
let RTS: Array<any>
let E: number
let PC: number

let instrs: Instruction[]

const current_thread = 1

function initialize_machine(): void {
  initialize_memory()

  OS = []
  RTS = []
  E = create_new_environment(current_thread)
  PC = 0
}

export const run = (vm_instrs: Instruction[]) => {
  initialize_machine()
  instrs = vm_instrs

  while (!(instrs[PC].tag === 'DONE')) {
    const instr = instrs[PC++]
    microcode[instr.tag](instr)
  }

  return
}

const microcode: { [type: string]: (instr: Instruction) => void } = {
  LDC: (instr: Ldc) => OS.push(JS_value_to_address(current_thread, instr.val)),
  BINOP: (instr: Binop) => OS.push(apply_binop(instr.sym, OS.pop(), OS.pop())),
  POP: (instr: Pop) => OS.pop(),
  GOTO: (instr: Goto) => (PC = instr.addr),
  ENTER_SCOPE: (instr: EnterScope) => {
    const block = get_block(current_thread)
    RTS.push(mem_allocate_Blockframe(block, E))
    const frame_address = mem_allocate_Frame(block, instr.syms.length)
    E = mem_Environment_extend(block, frame_address, E)
    const locals = instr.syms
    for (let i = 0; i < locals.length; i++) {
      mem_set_child(frame_address, i, Unassigned)
    }
  },
  EXIT_SCOPE: (instr: ExitScope) => (E = mem_get_Blockframe_environment(RTS.pop())),
  LD: (instr: Ld) => {
    const val = mem_get_Environment_value(E, instr.pos)
    if (is_Unassigned(val)) error('access of unassigned variable')
    OS.push(val)
  },
  ASSIGN: (instr: Assign) => mem_set_Environment_value(E, instr.pos, OS[OS.length - 1]),
  LDF: (instr: Ldf) => {
    const arity = instr.prms.length
    const block = get_block(current_thread)
    const closure_address = mem_allocate_Closure(block, arity, instr.addr, E)
    OS.push(closure_address)
  },
  CALL: (instr: Call) => {
    const arity = instr.arity
    const fun = OS[OS.length - 1 - arity]
    if (is_Builtin(fun)) {
      return apply_builtin(mem_get_Builtin_id(fun))
    }
    const block = get_block(current_thread)
    const frame_address = mem_allocate_Frame(block, arity)
    for (let i = arity - 1; i >= 0; i--) {
      mem_set_child(frame_address, i, OS.pop())
    }
    OS.pop() // pop fun
    RTS.push(mem_allocate_Callframe(block, E, PC))
    E = mem_Environment_extend(block, frame_address, mem_get_Closure_environment(fun))
    PC = mem_get_Closure_pc(fun)
  },
  RESET: (instr: Reset) => {
    // keep popping...
    const top_frame = RTS.pop()
    if (is_Callframe(top_frame)) {
      // ...until top frame is a call frame
      PC = mem_get_Callframe_pc(top_frame)
      E = mem_get_Callframe_environment(top_frame)
    } else {
      PC--
    }
  }
}

const apply_binop = (op: string, v2: number, v1: number) => 
  JS_value_to_address(
    current_thread,
    binop_microcode[op](address_to_JS_value(v1), address_to_JS_value(v2))
  )


const apply_builtin = (builtin_id: number) => {
  const result = builtin_array[builtin_id](OS)
  OS.pop() // pop fun
  OS.push(result)
}
