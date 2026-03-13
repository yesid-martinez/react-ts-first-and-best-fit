import { Memory } from "../entities/Memory"
import { Process } from "../entities/Process"
import type { AllocationStrategy } from "../strategies/AllocationStrategy"

export class MemoryAllocator {

  private strategy: AllocationStrategy

  constructor(strategy: AllocationStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: AllocationStrategy): void {
    this.strategy = strategy
  }

  allocate(memory: Memory, process: Process): boolean {

    const blocks = memory.getBlocks()

    const index = this.strategy.findBlock(
      blocks,
      process.size
    )

    if (index === -1) {
      return false
    }

    memory.allocateInBlock(index, process)

    return true

  }

}