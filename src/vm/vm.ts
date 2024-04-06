import { Goroutine, Task } from './goroutine'
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
import { Memory } from './memory'
import { Scheduler } from './scheduler'
import { stringify } from 'querystring'

export interface VirtualMachine {
  instrs: Instruction[]

  main(): Task
  switch(task: Task): void
  save(task: Task): void
}

export class GoVM implements VirtualMachine {
  scheduler: Scheduler

  threadCount: number
  instrs: Instruction[]
  memory: Memory

  OS: any[]
  RTS: any[]
  E: number
  PC: number
  currentThread: number
  currentThreadName: string

  constructor(instrs: Instruction[], memory: Memory) {
    this.threadCount = 1
    this.instrs = instrs
    this.memory = memory
  }

  main(): Goroutine {
    const threadId = this.threadCount++
    const context = {
      OS: [],
      RTS: [],
      E: this.memory.create_new_environment(),
      PC: 0
    }

    return new Goroutine(threadId, 'main', context)
  }

  switch(task: Task) {
    let go = task as Goroutine

    this.OS = go.context.OS
    this.RTS = go.context.RTS
    this.E = go.context.E
    this.PC = go.context.PC
    this.currentThread = go.id
    this.currentThreadName = go.name
  }

  save(go: Goroutine) {
    go.context.OS = this.OS
    go.context.RTS = this.RTS
    go.context.E = this.E
    go.context.PC = this.PC
  }

  run = (scheduler: Scheduler) => {
    this.scheduler = scheduler
    console.log('running', this.currentThreadName)
    while (this.should_continue()) {
      const instr = this.instrs[this.PC++]
      this.microcode[instr.tag](instr)
      this.scheduler.postLoopUpdate()
    }
  }

  should_continue = () => {
    return (
      this.instrs[this.PC].tag !== 'DONE' &&
      this.instrs[this.PC].tag !== 'GO_DONE' &&
      this.scheduler.checkCondition()
    )
  }

  microcode: { [type: string]: (instr: Instruction) => void } = {
    LDC: (instr: Ldc) => this.OS.push(this.memory.JS_value_to_address(instr.val)),
    BINOP: (instr: Binop) =>
      this.OS.push(this.apply_binop(instr.sym, this.OS.pop(), this.OS.pop())),
    POP: (instr: Pop) => this.OS.pop(),
    GOTO: (instr: Goto) => (this.PC = instr.addr),
    ENTER_SCOPE: (instr: EnterScope) => {
      this.RTS.push(this.memory.mem_allocate_Blockframe(this.E))
      const frame_address = this.memory.mem_allocate_Frame(instr.syms.length)
      this.E = this.memory.mem_Environment_extend(frame_address, this.E)
      const locals = instr.syms
      for (let i = 0; i < locals.length; i++) {
        this.memory.mem_set_child(frame_address, i, this.memory.Unassigned)
      }
    },
    EXIT_SCOPE: (instr: ExitScope) =>
      (this.E = this.memory.mem_get_Blockframe_environment(this.RTS.pop())),
    LD: (instr: Ld) => {
      const val = this.memory.mem_get_Environment_value(this.E, instr.pos)
      if (this.memory.is_Unassigned(val)) console.error('access of unassigned variable')
      this.OS.push(val)
    },
    ASSIGN: (instr: Assign) =>
      this.memory.mem_set_Environment_value(this.E, instr.pos, this.OS[this.OS.length - 1]),
    LDF: (instr: Ldf) => {
      const arity = instr.prms.length
      const closure_address = this.memory.mem_allocate_Closure(arity, instr.addr, this.E)
      this.OS.push(closure_address)
    },
    CALL: (instr: Call) => {
      const arity = instr.arity
      const fun = this.OS[this.OS.length - 1 - arity]
      if (this.memory.is_Builtin(fun)) {
        return this.apply_builtin(this.memory.mem_get_Builtin_id(fun))
      }
      const frame_address = this.memory.mem_allocate_Frame(arity)
      for (let i = arity - 1; i >= 0; i--) {
        this.memory.mem_set_child(frame_address, i, this.OS.pop())
      }
      this.OS.pop() // pop fun
      this.RTS.push(this.memory.mem_allocate_Callframe(this.E, this.PC))
      this.E = this.memory.mem_Environment_extend(
        frame_address,
        this.memory.mem_get_Closure_environment(fun)
      )
      this.PC = this.memory.mem_get_Closure_pc(fun)
    },
    GO: (instr: Call) => {
      const spawned = this.spawn_goroutine()
      this.scheduler.add(spawned)
    },
    RESET: (instr: Reset) => {
      // keep popping...
      const top_frame = this.RTS.pop()
      if (this.memory.is_Callframe(top_frame)) {
        // ...until top frame is a call frame
        this.PC = this.memory.mem_get_Callframe_pc(top_frame)
        this.E = this.memory.mem_get_Callframe_environment(top_frame)
      } else {
        this.PC--
      }
    }
  }

  spawn_goroutine = () => {
    return new Goroutine(this.currentThread, 'worker ' + String(this.threadCount++), {
      OS: [],
      RTS: [],
      E: this.E,
      PC: this.PC + 1 // + 1 to skip the GOTO instruction
    })
  }

  apply_binop = (op: string, v2: number, v1: number) =>
    this.memory.JS_value_to_address(
      this.memory.binop_microcode[op](
        this.memory.address_to_JS_value(v1),
        this.memory.address_to_JS_value(v2)
      )
    )

  apply_builtin = (builtin_id: number) => {
    const result = this.memory.builtin_array[builtin_id](this.OS)
    this.OS.pop() // pop fun
    this.OS.push(result)
  }
}
