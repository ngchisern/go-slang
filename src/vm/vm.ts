import { Goroutine, GoroutineState, Task } from './goroutine'
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
  Reset,
  Unop,
  Send
} from '../common/instruction'
import { Memory } from './memory/memory'
import {
  IControlInstruction,
  ILease,
  ISpawnBehavior,
  InstructionBatch,
  ManualAdd,
  TimeAllocation
} from './types'
import { GoSpawn } from './scheduler/worker'

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
  state: GoroutineState
  currentThread: number
  currentThreadName?: string
}

export class GoVM implements VirtualMachine {
  lease: ILease
  spawnBehavior: ISpawnBehavior

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
      state: GoroutineState.RUNNABLE,
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
    this.state.state = GoroutineState.RUNNING // always try to run it

    this.state.currentThread = go.id
    this.state.currentThreadName = go.name
  }

  save(go: Goroutine) {
    go.context.OS = this.state.OS
    go.context.RTS = this.state.RTS
    go.context.E = this.state.E
    go.context.PC = this.state.PC
    if (this.state.state === GoroutineState.BLOCKED) {
      go.state = GoroutineState.BLOCKED
    } else {
      go.state = GoroutineState.RUNNABLE
    }
  }

  run = (control: IControlInstruction): boolean => {
    this.lease = control.lease
    this.spawnBehavior = control.spawnBehavior

    let has_run = false

    this.start_lease()
    // console.log('running', this.state.currentThreadName)
    while (this.should_continue()) {
      const instr = this.instrs[this.state.PC++]
      // console.log('running ', this.state.PC, instr.tag)
      this.microcode[instr.tag](instr)
      this.post_loop_update()

      if (this.state.state !== GoroutineState.BLOCKED) {
        has_run = true
      }
    }

    return has_run
  }

  should_continue = () => {
    return (
      this.instrs[this.state.PC].tag !== 'DONE' &&
      this.instrs[this.state.PC].tag !== 'GO_DONE' &&
      this.check_lease() &&
      this.state.state !== GoroutineState.BLOCKED
    )
  }

  start_lease = () => {
    if (!this.lease) {
      return
    }

    if (this.lease.type === 'InstructionBatch') {
      // DO NOTHING
    } else if (this.lease.type === 'TimeAllocation') {
      const timeAllocation = this.lease as TimeAllocation
      timeAllocation.start = Date.now()
    } else {
      console.log('other lease type is not supported')
    }
  }

  check_lease = (): boolean => {
    if (!this.lease) {
      return true
    }

    if (this.lease.type === 'InstructionBatch') {
      const instructionBatch = this.lease as InstructionBatch
      return instructionBatch.instructionCount > 0
    } else if (this.lease.type === 'TimeAllocation') {
      const timeAllocation = this.lease as TimeAllocation
      const elapsedTime = Date.now() - timeAllocation.start
      return elapsedTime < timeAllocation.duration
    } else {
      console.log('other lease type is not supported')
      return true
    }
  }

  post_loop_update = () => {
    if (!this.lease) {
      return
    }

    if (this.lease.type === 'InstructionBatch') {
      const instructionBatch = this.lease as InstructionBatch
      instructionBatch.instructionCount--
    } else if (this.lease.type === 'TimeAllocation') {
      const timeAllocation = this.lease as TimeAllocation
      // TODO
    } else {
      console.log('other lease type is not supported')
    }
  }

  microcode: { [type: string]: (instr: Instruction) => void } = {
    LDC: (instr: Ldc) => this.state.OS.push(this.memory.JS_value_to_address(instr.val)),
    UNOP: (instr: Unop) => this.apply_unop(instr.sym),
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
      if (this.spawnBehavior.type === 'ManualAdd') {
        const scheduler = (this.spawnBehavior as ManualAdd).scheduler
        scheduler.add(spawned)
      } else if (this.spawnBehavior.type === 'AsyncCommunication') {
        postMessage({ type: 'go_spawn', goroutine: spawned } as GoSpawn)
      } else {
        console.log('Spawn Behavior', this.spawnBehavior.type, 'not supported')
      }
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
    },
    SEND: (instr: Send) => {
      this.memory.channel_send(this.state)
    }
  }

  spawn_goroutine = () => {
    const threadId = this.threadCount++
    return new Goroutine(threadId, 'worker ' + String(threadId), {
      OS: [],
      RTS: [],
      E: this.state.E,
      PC: this.state.PC + 1 // + 1 to skip the GOTO instruction
    })
  }

  apply_unop = (op: string) => {
    const v = this.state.OS.pop()
    const addr = this.memory.unop_microcode[op](v, this.state)

    if (this.state.state === GoroutineState.BLOCKED) {
      this.state.OS.push(v)
      return
    }

    this.state.OS.push(addr)
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

    if (this.state.state === GoroutineState.BLOCKED) {
      return
    }

    this.state.OS.pop() // pop fun
    this.state.OS.push(result)
  }
}
