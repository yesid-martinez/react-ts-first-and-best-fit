import { MemoryBlock } from "../entities/MemoryBlock"

export interface AllocationStrategy {

  findBlock(
    blocks: MemoryBlock[],
    processSize: number
  ): number

}