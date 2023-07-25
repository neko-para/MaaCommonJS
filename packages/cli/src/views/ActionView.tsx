import { Box, useApp } from 'ink'
import Button from '../components/Button.js'
import Group from '../components/Group.js'
import React, { useContext } from 'react'
import {
  globalConfigContext,
  setGlobalConfigContext,
  setLogInfoContext
} from '../state.js'
import { Preset } from '../config.js'
import { Task, runTask } from '../task.js'

export default function ActionView() {
  const { exit } = useApp()
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)
  const setLogInfo = useContext(setLogInfoContext)

  const doRunTask = () => {
    setLogInfo(log => {
      log.log.push('='.repeat(20))
    })
    runTask(
      Preset[globalConfig.game]!.assets,
      globalConfig.adb,
      globalConfig.address,
      globalConfig.tasks[globalConfig.game]!,
      (msg, detail) => {
        setLogInfo(log => {
          log.log.push(`${msg}: ${JSON.stringify(detail)}`)
        })
      }
    )
  }
  const resetTask = () => {
    setGlobalConfig(cfg => {
      const tasks: Task[] = []
      const templs = Preset[globalConfig.game]?.templates
      if (templs) {
        for (const key in templs) {
          tasks.push({
            name: `Task ${key}`,
            enable: true,
            type: key,
            ...templs[key]!
          })
        }
      }
      cfg.tasks[globalConfig.game] = tasks
    })
  }

  return (
    <Group title="操作">
      <Box gap={2}>
        <Button text="启动" onClick={doRunTask}></Button>
        <Button text="退出" onClick={exit}></Button>
        <Button text="重置任务" onClick={resetTask}></Button>
      </Box>
    </Group>
  )
}
