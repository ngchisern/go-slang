import { Memory, MemoryState } from './memory'

export class SharedMemory extends Memory {
  data: SharedArrayBuffer
  free_data: SharedArrayBuffer

  constructor(state?: MemoryState) {
    super(state)

    if (state) {
      this.data = state.data as SharedArrayBuffer
      if (state.free_data) {
        this.free_data = state.free_data as SharedArrayBuffer
      }
    } else {
      this.free_data = new SharedArrayBuffer(4)
      Atomics.store(new Uint32Array(this.free_data), 0, 0)
    }

    if (!state) {
      this.initialize()
    }
  }

  memory_state = (): MemoryState => {
    const super_state = super.base_state()
    super_state.free_data = this.free_data

    return super_state
  }

  mem_make(bytes: number): void {
    if (bytes % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    const data = new SharedArrayBuffer(bytes)
    const view = new DataView(data)
    this.data = data
    this.dataView = view
  }

  set_memory(data: SharedArrayBuffer): void {
    if (data.byteLength % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    this.data = data
    this.dataView = new DataView(data)
  }

  free(): number {
    return Atomics.load(new Uint32Array(this.free_data), 0)
  }

  increase_free(size: number): void {
    Atomics.add(new Uint32Array(this.free_data), 0, size)
  }

  setUint8(address: number, value: number): void {
    Atomics.store(new Uint8Array(this.data, address, 1), 0, value)
  }

  setUint16(address: number, value: number): void {
    Atomics.store(new Uint16Array(this.data, address, 1), 0, value)
  }

  setFloat64(address: number, value: number): void {
    const float64Array = new Float64Array(this.data, address, 1)
    float64Array[0] = value
  }

  getUint8(address: number): number {
    return Atomics.load(new Uint8Array(this.data, address, 1), 0)
  }

  getUint16(address: number): number {
    return Atomics.load(new Uint16Array(this.data, address, 1), 0)
  }

  getFloat64(address: number): number {
    const float64Array = new Float64Array(this.data, address, 1)
    return float64Array[0]
  }
}
