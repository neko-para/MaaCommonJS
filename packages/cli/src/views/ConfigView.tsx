import React, { useContext } from 'react'
import Group from '../components/Group.js'
import { Box, Text } from 'ink'
import TextInput from '../components/TextInput.js'
import { adbConfigContext, setAdbConfigContext } from '../state.js'

export default function ConfigView() {
  const adbConfig = useContext(adbConfigContext)
  const setAdbConfig = useContext(setAdbConfigContext)

  return (
    <Group title="配置">
      <Box flexDirection="column">
        <Text>{'    Adb: '}</Text>
        <Text>Address: </Text>
      </Box>
      <Box flexDirection="column">
        <TextInput
          value={adbConfig.adb}
          onChange={v =>
            setAdbConfig(c => {
              c.adb = v
            })
          }
        ></TextInput>
        <TextInput
          value={adbConfig.address}
          onChange={v =>
            setAdbConfig(c => {
              c.address = v
            })
          }
        ></TextInput>
      </Box>
    </Group>
  )
}
