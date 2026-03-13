import { Process } from "../domain/entities/Process"

export class ProcessQueue {

  private queue: Process[] = []

  enqueue(process: Process): void {
    this.queue.push(process)
  }

  dequeue(): Process | undefined {
    return this.queue.shift()
  }

  peek(): Process | undefined {
    return this.queue[0]
  }

  isEmpty(): boolean {
    return this.queue.length === 0
  }

  getAll(): Process[] {
    return [...this.queue]
  }

}