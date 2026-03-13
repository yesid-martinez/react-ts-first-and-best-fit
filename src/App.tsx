import './App.css'

import { useEffect } from "react"
import { useMemorySimulator } from "./hooks/useMemorySimulator"

export default function App() {

  const sim = useMemorySimulator(32)

  useEffect(() => {
    // @ts-ignore
    window.sim = sim
    sim.changeAlgorithm()
  }, [])
  
  console.log(sim.algorithm)
  return null

}