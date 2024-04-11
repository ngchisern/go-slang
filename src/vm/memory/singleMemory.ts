import { Memory, word_size } from './memory'

export class SingleMemory extends Memory {
  mem_make(bytes: number): void {
    if (bytes % 8 !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    const data = new ArrayBuffer(bytes)
    const view = new DataView(data)
    this.dataView = view
  }

  set_memory(data: ArrayBuffer): void {
    if (data.byteLength % word_size !== 0) {
      console.error('mem bytes must be divisible by 8')
    }
    this.dataView = new DataView(data)
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
}
