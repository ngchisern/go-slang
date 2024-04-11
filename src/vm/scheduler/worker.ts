import { Instruction } from '../../common/instruction'
import { Goroutine } from '../goroutine'
import { MemoryState } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import { AsyncCommunication, IControlInstruction, ILease } from '../types'
import { GoVM } from '../vm'

export interface MessageData {
  type: string
}

export class Log implements MessageData {
  type: 'log'
  args: any[]
}

export class SetUp implements MessageData {
  type: 'setup'
  state: MemoryState
  instrs: Instruction[]
}

export class SetUpDone implements MessageData {
  type: 'setup_done'
  success: boolean
}

export class Run implements MessageData {
  type: 'run'
  goroutine: Goroutine
  lease: ILease
}

export class RunDone implements MessageData {
  type: 'run_done'
  goroutine: Goroutine
}

export class SpawnNew implements MessageData {
  type: 'spawn_new'
  goroutine: Goroutine
}

let memory: SharedMemory
let vm: GoVM

const initialize_vm = (state: MemoryState, instrs: Instruction[]) => {
  memory = new SharedMemory(state)
  vm = new GoVM(instrs, memory)
}

const run = (goroutine: Goroutine, lease: ILease) => {
  vm.switch(goroutine)

  const controlInstruction = prepare_control_instruction(lease)
  vm.run(controlInstruction)

  vm.save(goroutine)
}

const prepare_control_instruction = (lease: ILease): IControlInstruction => {
  const spawnBehavior: AsyncCommunication = { type: 'AsyncCommunication' }
  return { spawnBehavior, lease } as IControlInstruction
}

const handle_main_message = (e: MessageEvent) => {
  const { type } = e.data as MessageData

  if (!type) {
    console.log('Message data is missing type:', e.data)
    return
  }

  switch (type) {
    case 'setup': {
      const { state, instrs } = e.data as SetUp
      initialize_vm(state, instrs)
      postMessage({ type: 'setup_done', success: true } as SetUpDone)
      break
    }
    case 'run': {
      const { goroutine, lease } = e.data as Run
      run(goroutine, lease)

      postMessage({ type: 'run_done', goroutine } as RunDone)
      break
    }
    default: {
      console.error('Unknown message type:', type)
      break
    }
  }
}

onmessage = handle_main_message

const originalConsoleLog = console.log;
console.log = (...args) => {
    postMessage({ type: 'log', args } as Log);
    originalConsoleLog.apply(console, args); 
};
