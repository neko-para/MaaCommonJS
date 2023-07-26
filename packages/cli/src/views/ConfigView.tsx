import React, { useContext } from 'react'
import Group from '../components/Group.js'
import { Box, Text } from 'ink'
import TextInput from '../components/TextInput.js'
import {
  globalConfigContext,
  setGlobalConfigContext,
  setHelpInfoContext
} from '../state.js'

export default function ConfigView() {
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)
  const setHelpInfo = useContext(setHelpInfoContext)

  const focusAdb = () => {
    setHelpInfo({
      desc: '配置adb命令',
      key: []
    })
  }

  const focusAddress = () => {
    setHelpInfo({
      desc: '配置adb连接地址',
      key: []
    })
  }

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
          onFocus={focusAdb}
        ></TextInput>
        <TextInput
          value={globalConfig.address}
          onChange={v =>
            setGlobalConfig(c => {
              c.address = v
            })
          }
          onFocus={focusAddress}
        ></TextInput>
      </Box>
    </Group>
  )
}
