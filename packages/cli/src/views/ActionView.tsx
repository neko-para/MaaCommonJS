import { Box, useApp } from 'ink'
import Button from '../components/Button.js'
import Group from '../components/Group.js'
import React, { useContext, useEffect, useRef } from 'react'
import {
  globalConfigContext,
  setGlobalConfigContext,
  setHelpInfoContext,
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
  const setTaskRunningState = useContext(setTaskRunningStateContext)
  const setLogInfo = useContext(setLogInfoContext)
  const setHelpInfo = useContext(setHelpInfoContext)

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
      const templs = Preset[globalConfig.game]?.templates ?? []
      for (const [idx, templ] of templs.entries()) {
        tasks.push({
          name: `Task ${idx}`,
          enable: true,
          ...templ!
        })
      }
      cfg.tasks[globalConfig.game] = tasks
    })
  }

  const focusRun = () => {
    setHelpInfo({
      desc: '开始执行!',
      key: [['回车', '确认']]
    })
  }

  const focusQuit = () => {
    setHelpInfo({
      desc: '退出程序',
      key: [['回车', '确认']]
    })
  }

  const focusReset = () => {
    setHelpInfo({
      desc: '从模板重置任务列表',
      key: [['回车', '确认']]
    })
  }

  return (
    <Group title="操作">
      <Box gap={2}>
        <Button text="启动" onClick={doRunTask} onFocus={focusRun}></Button>
        <Button text="退出" onClick={exit} onFocus={focusQuit}></Button>
        <Button
          text="重置任务"
          onClick={resetTask}
          onFocus={focusReset}
        ></Button>
      </Box>
    </Group>
  )
}
