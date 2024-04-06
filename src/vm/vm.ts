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

export interface VirtualMachine {
  instrs: Instruction[]

  main(): Task
  switch(task: Task): void
  save(task: Task): void
}

export interface VMState {
  OS: any[]
  RTS: any[]
  E: number
  PC: number
  blocked: boolean
  currentThread: number
  currentThreadName?: string
}

export class GoVM implements VirtualMachine {
  scheduler: Scheduler

  threadCount: number
  instrs: Instruction[]
  memory: Memory

  state: VMState

  constructor(instrs: Instruction[], memory: Memory) {
    this.threadCount = 1
    this.instrs = instrs
    this.memory = memory
    this.state = {
      OS: [],
      RTS: [],
      E: memory.create_new_environment(),
      PC: 0,
      blocked: false,
      currentThread: -1
    }
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

    this.state.OS = go.context.OS
    this.state.RTS = go.context.RTS
    this.state.E = go.context.E
    this.state.PC = go.context.PC
    this.state.blocked = false

    this.state.currentThread = go.id
    this.state.currentThreadName = go.name
  }

  save(go: Goroutine) {
    go.context.OS = this.state.OS
    go.context.RTS = this.state.RTS
    go.context.E = this.state.E
    go.context.PC = this.state.PC
  }

  run = (scheduler: Scheduler) => {
    this.scheduler = scheduler
    // console.log('running', this.state.currentThreadName)
    while (this.should_continue()) {
      const instr = this.instrs[this.state.PC++]
      this.microcode[instr.tag](instr)
      this.scheduler.postLoopUpdate()
    }
  }

  should_continue = () => {
    return (
      this.instrs[this.state.PC].tag !== 'DONE' &&
      this.instrs[this.state.PC].tag !== 'GO_DONE' &&
      this.scheduler.checkCondition() &&
      !this.state.blocked
    )
  }

  microcode: { [type: string]: (instr: Instruction) => void } = {
    LDC: (instr: Ldc) => this.state.OS.push(this.memory.JS_value_to_address(instr.val)),
    BINOP: (instr: Binop) =>
      this.state.OS.push(this.apply_binop(instr.sym, this.state.OS.pop(), this.state.OS.pop())),
    POP: (instr: Pop) => this.state.OS.pop(),
    GOTO: (instr: Goto) => (this.state.PC = instr.addr),
    ENTER_SCOPE: (instr: EnterScope) => {
      this.state.RTS.push(this.memory.mem_allocate_Blockframe(this.state.E))
      const frame_address = this.memory.mem_allocate_Frame(instr.syms.length)
      this.state.E = this.memory.mem_Environment_extend(frame_address, this.state.E)
      const locals = instr.syms
      for (let i = 0; i < locals.length; i++) {
        this.memory.mem_set_child(frame_address, i, this.memory.Unassigned)
      }
    },
    EXIT_SCOPE: (instr: ExitScope) =>
      (this.state.E = this.memory.mem_get_Blockframe_environment(this.state.RTS.pop())),
    LD: (instr: Ld) => {
      const load = (position: [number, number]) => {
        const val = this.memory.mem_get_Environment_value(this.state.E, position)
        if (this.memory.is_Unassigned(val)) console.error('access of unassigned variable')
        this.state.OS.push(val)
      }

      if (instr.sel) {
        load(instr.sel)
      }
      load(instr.pos)
    },
    ASSIGN: (instr: Assign) =>
      this.memory.mem_set_Environment_value(
        this.state.E,
        instr.pos,
        this.state.OS[this.state.OS.length - 1]
      ),
    LDF: (instr: Ldf) => {
      const arity = instr.prms.length
      const closure_address = this.memory.mem_allocate_Closure(arity, instr.addr, this.state.E)
      this.state.OS.push(closure_address)
    },
    CALL: (instr: Call) => {
      const arity = instr.arity
      const fun = this.state.OS[this.state.OS.length - 1 - arity]
      if (this.memory.is_Builtin(fun)) {
        return this.apply_builtin(this.memory.mem_get_Builtin_id(fun))
      }
      const frame_address = this.memory.mem_allocate_Frame(arity)
      for (let i = arity - 1; i >= 0; i--) {
        this.memory.mem_set_child(frame_address, i, this.state.OS.pop())
      }
      this.state.OS.pop() // pop fun
      this.state.RTS.push(this.memory.mem_allocate_Callframe(this.state.E, this.state.PC))
      this.state.E = this.memory.mem_Environment_extend(
        frame_address,
        this.memory.mem_get_Closure_environment(fun)
      )
      this.state.PC = this.memory.mem_get_Closure_pc(fun)
    },
    GO: (instr: Call) => {
      const spawned = this.spawn_goroutine()
      this.scheduler.add(spawned)
    },
    RESET: (instr: Reset) => {
      // keep popping...
      const top_frame = this.state.RTS.pop()
      if (this.memory.is_Callframe(top_frame)) {
        // ...until top frame is a call frame
        this.state.PC = this.memory.mem_get_Callframe_pc(top_frame)
        this.state.E = this.memory.mem_get_Callframe_environment(top_frame)
      } else {
        this.state.PC--
      }
    }
  }

  spawn_goroutine = () => {
    return new Goroutine(this.state.currentThread, 'worker ' + String(this.threadCount++), {
      OS: [],
      RTS: [],
      E: this.state.E,
      PC: this.state.PC + 1 // + 1 to skip the GOTO instruction
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
    const result = this.memory.builtin_array[builtin_id](this.state)

    if (this.state.blocked) {
      return
    }

    this.state.OS.pop() // pop fun
    this.state.OS.push(result)
  }
}
