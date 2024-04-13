import { Instruction } from '../../common/instruction'
import { Goroutine, GoroutineState } from '../goroutine'
import { MemoryState } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import {
  AsyncCommunication,
  GoBlockMulti,
  IControlInstruction,
  ILease,
  InstructionBatch
} from '../types'
import { exceed_lease } from '../utils'
import { GoVM, VMState } from '../vm'
import { WorkerState } from './parallelScheduler'

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
  state: WorkerState
}

export class GoSpawn implements MessageData {
  type: 'go_spawn'
  goroutine: Goroutine
}

export class GoPark implements MessageData {
  type: 'go_park'
  hash: number
  goroutine: Goroutine
  val_addr?: number
}

export class GoReady implements MessageData {
  type: 'go_ready'
  hash: number
  all: boolean
  is_chan?: boolean
}

export class GoReadyReply implements MessageData {
  type: 'go_ready_reply'
  hash: number
  goroutine?: Goroutine
  val_addr?: number
  success: boolean
}

export class MainDone implements MessageData {
  type: 'main_done'
}

let memory: SharedMemory
let vm: GoVM
let local_run_queue: Goroutine[] = []

const initialize_vm = (state: MemoryState, instrs: Instruction[]) => {
  memory = new SharedMemory(state)
  vm = new GoVM(instrs, memory)
  local_run_queue = []
}

async function run(goroutine: Goroutine) {
  vm.switch(goroutine)

  const controlInstruction = prepare_control_instruction()
  await vm.run(controlInstruction)
  vm.save(goroutine)
}

const prepare_control_instruction = (): IControlInstruction => {
  const lease: InstructionBatch = { type: 'InstructionBatch', instructionCount: 5 }
  const spawnBehavior: AsyncCommunication = { type: 'AsyncCommunication' }
  const goBlockBehavior: GoBlockMulti = { type: 'GoBlockMulti' }

  return { spawnBehavior, lease, goBlockBehavior } as IControlInstruction
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
      break
    }
  }
}

const post_run = (goroutine: Goroutine): boolean => {
  const isComplete = goroutine.isComplete(vm)

  if (goroutine.name == 'main' && goroutine.isComplete(vm)) {
    return true
  }

  if (isComplete || goroutine.state == GoroutineState.BLOCKED) {
    return false
  }

  if (exceed_lease(vm.lease)) {
    // post to main
    const goSpawn = { type: 'go_spawn', goroutine } as GoSpawn
    postMessage(goSpawn)
  } else {
    local_run_queue.push(goroutine)
  }

  return false
}

onmessage = handle_main_message

const originalConsoleLog = console.log
console.log = (...args) => {
  postMessage({ type: 'log', args } as Log)
  originalConsoleLog.apply(console, args)
}

/**
 * Poll 1/61 time from the global queue
 * to ensure fairness
 */
const GRQ_POLL_INTERVAL = 61
let nextTick = 0

async function main(resolve: Function) {
  const goroutine = local_run_queue?.shift()

  if (!goroutine || nextTick % GRQ_POLL_INTERVAL === 0) {
    const state = goroutine ? WorkerState.RUNNING : WorkerState.IDLE
    const goRequest = { type: 'go_request', state } as GoRequest
    postMessage(goRequest)
  }

  if (goroutine) {
    await run(goroutine)
    if (post_run(goroutine)) {
      postMessage({ type: 'main_done' } as MainDone)
    }
  }

  setTimeout(() => main(resolve), local_run_queue.length ? 0 : 10)
}

async function main_event() {
  await new Promise(main)
}

main_event()
