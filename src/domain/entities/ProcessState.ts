export const ProcessState = {
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  FINISHED: "FINISHED"
} as const;

export type ProcessState = typeof ProcessState[keyof typeof ProcessState];