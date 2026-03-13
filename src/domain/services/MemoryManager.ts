import { Memory } from "../entities/Memory"
import { Process } from "../entities/Process"
import type { AllocationStrategy } from "../strategies/AllocationStrategy"
import { MemoryAllocator } from "./MemoryAllocator"
import { ProcessQueue } from "../../structures/ProcessQueue"

export class MemoryManager {

  private memory: Memory
  private allocator: MemoryAllocator
  private queue: ProcessQueue
  private processes: Map<string, Process> = new Map()

  constructor(
    memorySize: number,
    strategy: AllocationStrategy
  ) {

    this.memory = new Memory(memorySize)
    this.allocator = new MemoryAllocator(strategy)
    this.queue = new ProcessQueue()

  }

  addProcess(process: Process): void {

    this.processes.set(process.id, process)

    const allocated = this.allocator.allocate(
      this.memory,
      process
    )

    if (!allocated) {
      this.queue.enqueue(process)
    }

  }

  releaseProcess(processId: string): void {

    this.memory.releaseProcess(processId)

    this.processes.delete(processId)

    this.processQueue()

  }

  private processQueue(): void {

    while (!this.queue.isEmpty()) {

      const process = this.queue.peek()

      if (!process) return

      const allocated = this.allocator.allocate(
        this.memory,
        process
      )

      if (!allocated) {
        return
      }

      this.queue.dequeue()

    }

  }

  tick(): void {

    for (const process of this.processes.values()) {

      process.tick()

      if (process.isFinished()) {
        this.releaseProcess(process.id)
      }

    }

  }

  changeStrategy(strategy: AllocationStrategy): void {

    this.allocator.setStrategy(strategy)

  }

  getMemoryBlocks() {

    return this.memory.getBlocks()

  }

  getQueue() {

    return this.queue.getAll()

  }

}