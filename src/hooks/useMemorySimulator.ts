import { useRef, useState } from "react"

import { MemoryManager } from "../domain/services/MemoryManager"
import { Process } from "../domain/entities/Process"

import { FirstFitStrategy } from "../domain/strategies/FirstFitStrategy"
import { BestFitStrategy } from "../domain/strategies/BestFitStrategy"

export function useMemorySimulator(memorySize: number = 64) {

  const managerRef = useRef(
    new MemoryManager(memorySize, new FirstFitStrategy())
  )

  const [blocks, setBlocks] = useState(
    managerRef.current.getMemoryBlocks()
  )

  const [queue, setQueue] = useState(
    managerRef.current.getQueue()
  )

  const [algorithm, setAlgorithm] = useState<"first" | "best">("first")

  const [processCounter, setProcessCounter] = useState(1)

  const refreshState = () => {

    const manager = managerRef.current

    setBlocks([...manager.getMemoryBlocks()])
    setQueue([...manager.getQueue()])

  }

  const addProcess = (
    size: number,
    duration?: number,
    name?: string
  ) => {

    const id = crypto.randomUUID()

    const processName = name ?? `P${processCounter}`

    const process = new Process(
      id,
      processName,
      size,
      duration
    )

    managerRef.current.addProcess(process)

    setProcessCounter(c => c + 1)

    refreshState()

  }

  const killProcess = (processId: string) => {

    managerRef.current.releaseProcess(processId)

    refreshState()

  }

  const changeAlgorithm = () => {

    const manager = managerRef.current

    if (algorithm === "first") {

      manager.changeStrategy(new BestFitStrategy())
      setAlgorithm("best")

    } else {

      manager.changeStrategy(new FirstFitStrategy())
      setAlgorithm("first")

    }

  }

  const debugPrintMemory = () => {

    const blocks = managerRef.current.getMemoryBlocks()

    console.log("MEMORY STATE")

    console.table(
      blocks.map(b => ({
        start: b.start,
        size: b.size,
        process: b.process?.name ?? "FREE"
      }))
    )

  }

  const debugPrintQueue = () => {

    const queue = managerRef.current.getQueue()

    console.log("QUEUE")

    console.table(
      queue.map(p => ({
        name: p.name,
        size: p.size
      }))
    )

  }

  const debugTick = () => {

    managerRef.current.tick()

    refreshState()

  }

  const debugAddProcess = (size: number, name?: string) => {

    addProcess(size, undefined, name)

    debugPrintMemory()
    debugPrintQueue()

  }

  const debugKillProcess = (processId: string) => {

    killProcess(processId)

    debugPrintMemory()
    debugPrintQueue()

  }

  return {

    memoryBlocks: blocks,
    queue,

    algorithm,

    addProcess,
    killProcess,
    changeAlgorithm,

    debugAddProcess,
    debugKillProcess,
    debugTick,
    debugPrintMemory,
    debugPrintQueue

  }

}