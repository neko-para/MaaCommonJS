import { useContext } from 'react'
import { logInfoContext } from '../state.js'
import Group from '../components/Group.js'
import React from 'react'
import { Box, Text } from 'ink'

export default function LogView() {
  const logInfo = useContext(logInfoContext)

  return (
    <Group title="日志">
      <Box flexDirection="column">
        {logInfo.log.slice(-20).map((l, i) => {
          return <Text key={i}>{l}</Text>
        })}
      </Box>
    </Group>
  )
}
