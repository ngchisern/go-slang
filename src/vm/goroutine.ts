import { GoVM, VirtualMachine } from './vm'

export interface Task {
  id: number

  isComplete(vm: VirtualMachine): boolean
}

export enum GoroutineState {
  RUNNING,
  RUNNABLE,
  BLOCKED
}

interface GoroutineContext {
  OS: Array<any>
  RTS: Array<any>
  E: number
  PC: number
}

export class Goroutine implements Task {
  id: number
  name: string // TODO: to remove: temporary identifier for now
  state: GoroutineState
  context: GoroutineContext

  constructor(id: number, name: string, context: GoroutineContext) {
    this.id = id
    this.name = name
    this.context = context
    this.state = GoroutineState.RUNNABLE
  }

  isComplete(vm: VirtualMachine) {
    // Updated type of 'vm' parameter
    const PC = this.context.PC
    return vm.instrs[PC].tag === 'DONE' || vm.instrs[PC].tag === 'GO_DONE'
  }
}
