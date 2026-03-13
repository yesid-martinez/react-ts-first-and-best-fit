import { Process } from "./Process"

export class MemoryBlock {
  start: number
  size: number
  process: Process | null

  constructor(
    start: number,
    size: number,
    process: Process | null = null
  ) {
    this.start = start
    this.size = size
    this.process = process
  }

  isFree(): boolean {
    return this.process === null
  }

  allocate(process: Process): void {
    this.process = process
  }

  release(): void {
    this.process = null
  }

  getEnd(): number {
    return this.start + this.size
  }

}