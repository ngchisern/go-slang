import { Memory } from '../memory/memory'
import { SharedMemory } from '../memory/sharedMemory'

export interface MessageData {
  type: string
  data: any
}

export class MemomryData implements MessageData {
  type: 'MemoryData'
  data: SharedArrayBuffer
}

let memory: SharedMemory

const initialize_memory = (data: SharedArrayBuffer) => {
  memory = new SharedMemory(data)
}

const handleMainMessage = (e: MessageEvent) => {
  const { type, data } = e.data as MessageData

  if (!type || !data) {
    console.log('Message data is missing type or data:', e.data)
    return
  }

  switch (type) {
    case 'MemoryData': {
      const sharedArrayBuffer = data as SharedArrayBuffer
      initialize_memory(sharedArrayBuffer)
      console.log('MemoryData received:', sharedArrayBuffer)
      break
    }
    default: {
      console.error('Unknown message type:', type)
      break
    }
  }
}

onmessage = handleMainMessage
