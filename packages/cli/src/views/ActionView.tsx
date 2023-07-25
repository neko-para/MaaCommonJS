import { Box, useApp } from 'ink'
import Button from '../components/Button.js'
import Group from '../components/Group.js'
import React, { useContext } from 'react'
import {
  adbConfigContext,
  globalConfigContext,
  setLogInfoContext,
  setTaskInfoContext,
  taskInfoContext
} from '../state.js'
import { Preset } from '../config.js'
import { Task, runTask } from '../task.js'

export default function ActionView() {
  const { exit } = useApp()
  const adbConfig = useContext(adbConfigContext)
  const globalConfig = useContext(globalConfigContext)
  const taskInfo = useContext(taskInfoContext)
  const setTaskInfo = useContext(setTaskInfoContext)
  const setLogInfo = useContext(setLogInfoContext)
  const doRunTask = () => {
    runTask(
      Preset[globalConfig.game]!.assets,
      adbConfig.adb,
      adbConfig.address,
      taskInfo[globalConfig.game]!,
      (msg, detail) => {
        setLogInfo(log => {
          log.log.push(`${msg}: ${JSON.stringify(detail)}`)
        })
      }
    )
  }
  const resetTask = () => {
    setTaskInfo(info => {
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
      info[globalConfig.game] = tasks
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
