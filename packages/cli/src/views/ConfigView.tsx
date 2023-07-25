import React, { useContext } from 'react'
import Group from '../components/Group.js'
import { Box, Text } from 'ink'
import TextInput from '../components/TextInput.js'
import { globalConfigContext, setGlobalConfigContext } from '../state.js'

export default function ConfigView() {
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)

  return (
    <Group title="配置">
      <Box flexDirection="column">
        <Text>{'    Adb: '}</Text>
        <Text>Address: </Text>
      </Box>
      <Box flexDirection="column">
        <TextInput
          value={globalConfig.adb}
          onChange={v =>
            setGlobalConfig(c => {
              c.adb = v
            })
          }
        ></TextInput>
        <TextInput
          value={globalConfig.address}
          onChange={v =>
            setGlobalConfig(c => {
              c.address = v
            })
          }
        ></TextInput>
      </Box>
    </Group>
  )
}
