import React, { useContext } from 'react'
import Group from '../components/Group.js'
import { helpInfoContext } from '../state.js'
import { Box, Text } from 'ink'

export default function HelpView() {
  const helpInfo = useContext(helpInfoContext)

  return (
    <Group title="帮助">
      <Box flexDirection="column">
        <Text>{helpInfo.desc}</Text>
        <Box gap={2}>
          {helpInfo.key.map((info, idx) => {
            return <Text key={idx}>{`${info[0]}: ${info[1]}`}</Text>
          })}
          <Text>Tab: 切换</Text>
        </Box>
      </Box>
    </Group>
  )
}
