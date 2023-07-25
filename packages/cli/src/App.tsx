import { useApp, Box, Text } from 'ink'
import React, { useState } from 'react'
import Button from './components/Button.js'

export function App() {
  const { exit } = useApp()

  return (
    <Box padding={1}>
      <Button text="启动" onClick={exit}></Button>
    </Box>
  )
}
