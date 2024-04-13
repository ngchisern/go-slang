import { Instruction } from '../../common/instruction'
import { Goroutine, GoroutineState, Task } from '../goroutine'
import { SingleMemory } from '../memory/singleMemory'
import {
  GoBlockSingle,
  GoChannelBuffer,
  IControlInstruction,
  ISpawnBehavior,
  InstructionBatch,
  ManualAdd,
  TimeAllocation
} from '../types'
import { GoVM } from '../vm'

export interface Scheduler {
  run(): void
  add(task: Task): void
}

export class TimeSliceGoScheduler implements Scheduler {
  vm: GoVM

  private queue: Goroutine[]
  private blocked: { [key: number]: Set<Goroutine> }
  private channelBlocked: { [key: number]: Set<GoChannelBuffer> }

  constructor(instrs: Instruction[]) {
    const memory = new SingleMemory()
    const vm = new GoVM(instrs, memory)

    this.queue = []
    this.blocked = {}
    this.channelBlocked = {}
    this.vm = vm
  }

  run() {
    const main = this.vm.main()
    this.queue.push(main)

    while (true) {
      if (this.queue.length === 0) {
        throw new Error('All goroutines are asleep - deadlock!')
      }

      const go = this.queue.shift() as Goroutine
      this.vm.switch(go)

      this.vm.run(this.create_control_instruction())

      this.vm.save(go)
      if (!go.isComplete(this.vm) && go.state == GoroutineState.RUNNABLE) {
        this.queue.push(go)
      } else if (go.name == 'main' && go.isComplete(this.vm)) {
        break
      }
    }
  }

  add(task: Task) {
    this.queue.push(task as Goroutine)
  }

  add_blocked(addr: number, task: Task) {
    if (!this.blocked[addr]) {
      this.blocked[addr] = new Set()
    }
    this.blocked[addr].add(task as Goroutine)
  }

  remove_blocked(addr: number): Goroutine | undefined {
    if (!this.blocked[addr] || this.blocked[addr].size === 0) {
      return undefined
    }

    const goroutine = this.blocked[addr].values().next().value

    goroutine.state = GoroutineState.RUNNABLE
    this.queue.push(goroutine)
    this.blocked[addr].delete(goroutine)
    return goroutine
  }

  remove_blocked_all(addr: number): boolean {
    if (!this.blocked[addr]) {
      return false
    }

    this.blocked[addr].forEach(goroutine => {
      goroutine.state = GoroutineState.RUNNABLE
      this.queue.push(goroutine)
    })
    delete this.blocked[addr]

    return true
  }

  add_channel_blocked(addr: number, task: Task, value: number) {
    if (!this.channelBlocked[addr]) {
      this.channelBlocked[addr] = new Set()
    }

    const buffer: GoChannelBuffer = { goroutine: task as Goroutine, addr: value }
    this.channelBlocked[addr].add(buffer)
  }

  remove_channel_blocked(addr: number): GoChannelBuffer | undefined {
    if (!this.channelBlocked[addr] || this.channelBlocked[addr].size === 0) {
      return undefined
    }

    const buffer = this.channelBlocked[addr].values().next().value
    buffer.goroutine.state = GoroutineState.RUNNABLE
    this.queue.push(buffer.goroutine)
    this.channelBlocked[addr].delete(buffer)
    return buffer
  }

  create_control_instruction(): IControlInstruction {
    const lease: InstructionBatch = { type: 'InstructionBatch', instructionCount: 5 }
    const spawnBehavior: ManualAdd = { type: 'ManualAdd', scheduler: this }
    const goBlockBehavior: GoBlockSingle = { type: 'GoBlockSingle', scheduler: this }

    return { lease, spawnBehavior, goBlockBehavior } as IControlInstruction
  }
}
