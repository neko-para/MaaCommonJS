import React, { useContext, useState } from 'react'
import Group from '../components/Group.js'
import { Box, Text, useFocus, useInput } from 'ink'
import { globalConfigContext, setGlobalConfigContext } from '../state.js'
import { Preset } from '../config.js'

export default function TaskInfoView() {
  const { isFocused } = useFocus()
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)
  const [idx, setIdx] = useState(0)

  const info = globalConfig.tasks[globalConfig.game] ?? []

  const fix = (v: number) => {
    if (info.length === 0) {
      return 0
    } else if (v < 0) {
      return 0
    } else if (v >= info.length) {
      return info.length - 1
    } else {
      return v
    }
  }

  useInput((input, key) => {
    if (!isFocused) {
      return
    }

    if (key.upArrow) {
      setIdx(fix(idx - 1))
    } else if (key.downArrow) {
      setIdx(fix(idx + 1))
    } else if (input === ' ') {
      if (idx !== -1) {
        setGlobalConfig(cfg => {
          cfg.tasks[globalConfig.game]![idx]!.enable =
            !cfg.tasks[globalConfig.game]![idx]!.enable
        })
      }
    }
  })

  return (
    <Group title="任务列表">
      <Box gap={2}>
        <Box flexDirection="column">
          <Text>启用</Text>
          {info.map((task, i) => {
            return (
              <Text underline={idx === i && isFocused} key={task.name}>
                [{task.enable ? '*' : ' '}]
              </Text>
            )
          })}
        </Box>
        <Box flexDirection="column">
          <Text>名称</Text>
          {info.map((task, i) => {
            return (
              <Text underline={idx === i && isFocused} key={task.name}>
                {task.name}
              </Text>
            )
          })}
        </Box>
        <Box flexDirection="column">
          <Text>任务</Text>
          {info.map((task, i) => {
            return (
              <Text underline={idx === i && isFocused} key={task.name}>
                {Preset[globalConfig.game]?.templates[task.type]?.desc ?? ''}
              </Text>
            )
          })}
        </Box>
      </Box>
    </Group>
  )
}