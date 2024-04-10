import { Memory } from './memory'

export class SharedMemory extends Memory {
  private data: SharedArrayBuffer

  mem_make(bytes: number): void {
    if (bytes % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    const data = new SharedArrayBuffer(bytes)
    const view = new DataView(data)
    this.data = data
    this.dataView = view
  }

  setUint8(address: number, value: number): void {
    this.dataView.setUint8(address, value)
  }

  setUint16(address: number, value: number): void {
    this.dataView.setUint16(address, value)
  }

  setFloat64(address: number, value: number): void {
    this.dataView.setFloat64(address, value)
  }

  getUint8(address: number): number {
    return this.dataView.getUint8(address)
  }

  getUint16(address: number): number {
    return this.dataView.getUint16(address)
  }

  getFloat64(address: number): number {
    return this.dataView.getFloat64(address)
  }

  //   setUint8(address: number, value: number): void {
  //     Atomics.store(new Uint8Array(this.data, address, 1), 0, value)
  //   }

  //   setUint16(address: number, value: number): void {
  //     Atomics.store(new Uint16Array(this.data, address, 1), 0, value)
  //   }

  //   setFloat64(address: number, value: number): void {
  //     const float64Array = new Float64Array(this.data, address, 1)
  //     float64Array[0] = value
  //   }

  //   getUint8(address: number): number {
  //     return Atomics.load(new Uint8Array(this.data, address, 1), 0)
  //   }

  //   getUint16(address: number): number {
  //     return Atomics.load(new Uint16Array(this.data, address, 1), 0)
  //   }

  //   getFloat64(address: number): number {
  //     const float64Array = new Float64Array(this.data, address, 1)
  //     return float64Array[0]
  //   }
}
