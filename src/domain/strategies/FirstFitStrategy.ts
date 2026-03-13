import { MemoryBlock } from "../entities/MemoryBlock"
import type { AllocationStrategy } from "./AllocationStrategy"

export class FirstFitStrategy implements AllocationStrategy {

  findBlock(
    blocks: MemoryBlock[],
    processSize: number
  ): number {

    for (let i = 0; i < blocks.length; i++) {

      const block = blocks[i]

      if (block.isFree() && block.size >= processSize) {
        return i
      }

    }

    return -1

  }

}