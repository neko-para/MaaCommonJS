import { config, loadConfig, saveConfig } from './config.js'
import { runTask } from './task.js'
// import * as _1999 from './1999.js'
import React, { useState, useEffect } from 'react'
import { render, Text } from 'ink'

const Counter = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(previousCounter => previousCounter + 1)
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <Text color="green">{counter} tests passed</Text>
}

render(<Counter />)

// async function main() {
//   loadConfig()

//   saveConfig()
// }

// main()
