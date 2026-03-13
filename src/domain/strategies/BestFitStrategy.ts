import { MemoryBlock } from "../entities/MemoryBlock"
import type { AllocationStrategy } from "./AllocationStrategy"

export class BestFitStrategy implements AllocationStrategy {

  findBlock(
    blocks: MemoryBlock[],
    processSize: number
  ): number {

    let bestIndex = -1
    let smallestDifference = Infinity

    for (let i = 0; i < blocks.length; i++) {

      const block = blocks[i]

      if (!block.isFree()) {
        continue
      }

      const difference = block.size - processSize

      if (difference >= 0 && difference < smallestDifference) {

        smallestDifference = difference
        bestIndex = i

      }

    }

    return bestIndex

  }

}