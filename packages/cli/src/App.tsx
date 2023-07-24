import { useApp, Box, Text } from 'ink'
import React, { useState } from 'react'

export function App() {
  const { exit } = useApp()

  return (
    <Box padding={1}>
      <Box borderStyle="single">
        <Text color="red">Start Tasks</Text>
      </Box>
    </Box>
  )
}
