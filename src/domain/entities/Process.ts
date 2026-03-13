import { ProcessState } from "./ProcessState"

export class Process {

  readonly id: string
  readonly name: string
  readonly size: number

  private remainingTime?: number
  private state: ProcessState = ProcessState.RUNNING

  constructor(
    id: string,
    name: string,
    size: number,
    duration?: number
  ) {

    this.id = id
    this.name = name
    this.size = size

    if (duration !== undefined) {
      this.remainingTime = duration
    }
  }

  tick(seconds: number = 1): void {

    if (this.state !== ProcessState.RUNNING) {
      return
    }

    if (this.remainingTime === undefined) {
      return
    }

    this.remainingTime = Math.max(
      0,
      this.remainingTime - seconds
    )

    if (this.remainingTime === 0) {
      this.state = ProcessState.FINISHED
    }

  }

  pause(): void {
    if (this.state === ProcessState.RUNNING) {
      this.state = ProcessState.PAUSED
    }
  }

  resume(): void {
    if (this.state === ProcessState.PAUSED) {
      this.state = ProcessState.RUNNING
    }
  }

  finish(): void {
    this.state = ProcessState.FINISHED
  }

  isFinished(): boolean {
    return this.state === ProcessState.FINISHED
  }

  isPaused(): boolean {
    return this.state === ProcessState.PAUSED
  }

  getRemainingTime(): number | undefined {
    return this.remainingTime
  }

  getState(): ProcessState {
    return this.state
  }

}