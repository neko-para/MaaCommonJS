import { Box, useApp } from 'ink'
import Button from '../components/Button.js'
import Group from '../components/Group.js'
import React, { useContext, useEffect, useRef } from 'react'
import {
  globalConfigContext,
  setGlobalConfigContext,
  setLogInfoContext,
  setTaskRunningStateContext,
  taskRunningStateContext
} from '../state.js'
import { Preset } from '../config.js'
import { Task, runTask } from '../task.js'

export default function ActionView() {
  const { exit } = useApp()
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)
  const taskRunningState = useContext(taskRunningStateContext)
  const setTaskRunningState = useContext(setTaskRunningStateContext)
  const setLogInfo = useContext(setLogInfoContext)

  const doRunTask = () => {
    setTaskRunningState(info => {
      info.tasks = []
    })
    setLogInfo(log => {
      log.log.push('='.repeat(20))
    })
    runTask(
      Preset[globalConfig.game]!.assets,
      globalConfig.adb,
      globalConfig.address,
      globalConfig.tasks[globalConfig.game]?.filter(task => task.enable) ?? [],
      (msg, detail) => {
        setLogInfo(log => {
          log.log.push(`${msg}: ${JSON.stringify(detail)}`)
        })
      },
      {
        add(name) {
          return new Promise<number>(resolve => {
            setTaskRunningState(info => {
              const id = info.tasks.length
              setTimeout(() => {
                resolve(id)
              }, 0)
              info.tasks.push({
                name,
                state: 'pending'
              })
            })
          })
        },
        async set(idx, status) {
          setTaskRunningState(info => {
            const s = info.tasks[idx]
            if (s) {
              s.state = status
            }
          })
        }
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
