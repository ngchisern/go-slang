import { Instruction } from '../../common/instruction'
import { Goroutine } from '../goroutine'
import { MemoryState } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'
import { GoVM } from '../vm'

export interface MessageData {
  type: string
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
}

export class RunDone implements MessageData {
  type: 'run_done'
  goroutine: Goroutine
}

let memory: SharedMemory
let vm: GoVM

const initialize_vm = (state: MemoryState, instrs: Instruction[]) => {
  memory = new SharedMemory(state)
  vm = new GoVM(instrs, memory)
}

const run = (goroutine: Goroutine) => {
  vm.switch(goroutine)
  vm.run_all()
  vm.save(goroutine)
}

const handleMainMessage = (e: MessageEvent) => {
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
      const { goroutine } = e.data as Run

      console.log('Running goroutine:', goroutine)
      run(goroutine)
      console.log('Done running goroutine:', goroutine)

      console.log(goroutine)
      postMessage({ type: 'run_done', goroutine: goroutine } as RunDone)
      break
    }
    default: {
      console.error('Unknown message type:', type)
      break
    }
  }
}

onmessage = handleMainMessage
