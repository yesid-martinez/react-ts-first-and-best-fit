import { MemoryBlock } from "./MemoryBlock"
import { Process } from "./Process"

export class Memory {

    private blocks: MemoryBlock[] = []
    private totalSize: number

  constructor(totalSize: number) {

    this.totalSize = totalSize

    this.blocks.push(
      new MemoryBlock(0, totalSize, null)
    )

  }

  getBlocks(): MemoryBlock[] {
    return this.blocks
  }

  allocateInBlock(index: number, process: Process): void {

    const block = this.blocks[index]

    if (!block.isFree()) {
      throw new Error("Block is not free")
    }

    if (block.size < process.size) {
      throw new Error("Block too small")
    }

    if (block.size === process.size) {

      block.allocate(process)
      return

    }

    this.splitBlock(index, process)

  }

  private splitBlock(index: number, process: Process): void {

    const block = this.blocks[index]

    const allocated = new MemoryBlock(
      block.start,
      process.size,
      process
    )

    const remaining = new MemoryBlock(
      block.start + process.size,
      block.size - process.size,
      null
    )

    this.blocks.splice(index, 1, allocated, remaining)

  }

  releaseProcess(processId: string): void {

    const index = this.findProcessBlock(processId)

    if (index === -1) {
      return
    }

    this.blocks[index].release()

    this.mergeFreeBlocks()

  }

  private findProcessBlock(processId: string): number {

    return this.blocks.findIndex(
      block => block.process?.id === processId
    )

  }

  private mergeFreeBlocks(): void {

    for (let i = 0; i < this.blocks.length - 1; i++) {

      const current = this.blocks[i]
      const next = this.blocks[i + 1]

      if (current.isFree() && next.isFree()) {

        current.size += next.size

        this.blocks.splice(i + 1, 1)

        i--
      }
    }
  }
}