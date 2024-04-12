import { Instruction } from '../../common/instruction'
import { Goroutine } from '../goroutine'
import { MemoryState } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import { AsyncCommunication, IControlInstruction, ILease, InstructionBatch } from '../types'
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

export class GoAllocate implements MessageData {
  type: 'go_allocate'
  goroutines: Goroutine[]
}

export class GoRequest implements MessageData {
  type: 'go_request'
}

export class GoSpawn implements MessageData {
  type: 'go_spawn'
  goroutine: Goroutine
}

export class GoPark implements MessageData {
  type: 'go_park'
  goroutine: Goroutine
}

export class GoReady implements MessageData {
  type: 'go_ready'
  goroutine: Goroutine
}

export class MainDone implements MessageData {
  type: 'main_done'
  has_run: boolean
}

let memory: SharedMemory
let vm: GoVM
let local_run_queue: Goroutine[] = []

const initialize_vm = (state: MemoryState, instrs: Instruction[]) => {
  memory = new SharedMemory(state)
  vm = new GoVM(instrs, memory)
  local_run_queue = []
}

const run = (goroutine: Goroutine): boolean => {
  vm.switch(goroutine)

  const lease: InstructionBatch = { type: 'InstructionBatch', instructionCount: 5 }
  const controlInstruction = prepare_control_instruction(lease)
  const has_run = vm.run(controlInstruction)

  vm.save(goroutine)

  return has_run
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
    case 'go_allocate': {
      const { goroutines } = e.data as GoAllocate

      // rehydrate all goroutines
      goroutines.forEach(goroutine => {
        local_run_queue.push(new Goroutine(goroutine.id, goroutine.name, goroutine.context))
      })
      break
    }
    default: {
      console.error('Unknown message type:', type)
      break
    }
  }
}

const post_run = (goroutine: Goroutine): boolean => {
  if (!goroutine.isComplete(vm)) {
    local_run_queue.push(goroutine)
  } else if (goroutine.name === 'main') {
    return true
  }

  return false
}

onmessage = handle_main_message

const originalConsoleLog = console.log
console.log = (...args) => {
  postMessage({ type: 'log', args } as Log)
  originalConsoleLog.apply(console, args)
}

function main(resolve: Function) {
  const goroutine = local_run_queue?.shift();
  if (goroutine) {
    const has_run = run(goroutine);
    if (post_run(goroutine)) {
      postMessage({ type: 'main_done', has_run } as MainDone)
    }
  } else {
    postMessage({ type: 'go_request' } as GoRequest)
  }

  setTimeout(() => main(resolve), local_run_queue.length ? 0 : 100);
}

async function main_event() {
  await new Promise(main);
}

main_event();
