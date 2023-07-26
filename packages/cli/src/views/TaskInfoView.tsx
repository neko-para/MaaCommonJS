import React, { useContext, useEffect, useState } from 'react'
import Group from '../components/Group.js'
import { Box, Text, useFocus, useInput } from 'ink'
import {
  globalConfigContext,
  setGlobalConfigContext,
  setHelpInfoContext
} from '../state.js'
import { Preset } from '../config.js'

export default function TaskInfoView() {
  const { isFocused } = useFocus()
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)
  const setHelpInfo = useContext(setHelpInfoContext)
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

  useEffect(() => {
    if (isFocused) {
      setHelpInfo({
        desc: '配置任务是否启用',
        key: [
          ['空格', '切换启用'],
          ['上下键', '切换任务']
        ]
      })
    }
  }, [isFocused])

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
                {task.desc}
              </Text>
            )
          })}
        </Box>
      </Box>
    </Group>
  )
}
