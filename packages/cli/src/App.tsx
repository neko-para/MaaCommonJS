import fs from 'fs'
import React, { useEffect } from 'react'
import {
  AdbConfig,
  GlobalConfig,
  LogInfo,
  TaskInfo,
  adbConfigContext,
  globalConfigContext,
  logInfoContext,
  setAdbConfigContext,
  setGlobalConfigContext,
  setLogInfoContext,
  setTaskInfoContext,
  taskInfoContext
} from './state.js'
import { useImmer } from 'use-immer'
import { Config } from './config.js'
import ConfigView from './views/ConfigView.js'
import ActionView from './views/ActionView.js'
import { Box } from 'ink'
import TaskInfoView from './views/TaskInfoView.js'
import LogView from './views/LogView.js'

export function App() {
  const [adbConfig, setAdbConfig] = useImmer<AdbConfig>({
    adb: 'adb' + (process.platform === 'win32' ? '.exe' : ''),
    address: '127.0.0.1:5555'
  })
  const [globalConfig, setGlobalConfig] = useImmer<GlobalConfig>({
    game: '1999'
  })
  const [taskInfo, setTaskInfo] = useImmer<TaskInfo>({})
  const [logInfo, setLogInfo] = useImmer<LogInfo>({ log: [] })

  useEffect(() => {
    if (fs.existsSync('config.json')) {
      const res: Config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))
      setAdbConfig(res)
      setGlobalConfig(res)
      setTaskInfo(res.tasks)
    }
  }, [])
  useEffect(() => {
    fs.writeFileSync(
      'config.json',
      JSON.stringify(
        {
          ...adbConfig,
          ...globalConfig,
          tasks: taskInfo
        },
        null,
        2
      )
    )
  }, [adbConfig, globalConfig, taskInfo])

  return (
    <adbConfigContext.Provider value={adbConfig}>
      <setAdbConfigContext.Provider value={setAdbConfig}>
        <globalConfigContext.Provider value={globalConfig}>
          <setGlobalConfigContext.Provider value={setGlobalConfig}>
            <taskInfoContext.Provider value={taskInfo}>
              <setTaskInfoContext.Provider value={setTaskInfo}>
                <logInfoContext.Provider value={logInfo}>
                  <setLogInfoContext.Provider value={setLogInfo}>
                    <Box>
                      <Box flexDirection="column">
                        <ConfigView></ConfigView>
                        <ActionView></ActionView>
                        <TaskInfoView></TaskInfoView>
                      </Box>
                      <LogView></LogView>
                    </Box>
                  </setLogInfoContext.Provider>
                </logInfoContext.Provider>
              </setTaskInfoContext.Provider>
            </taskInfoContext.Provider>
          </setGlobalConfigContext.Provider>
        </globalConfigContext.Provider>
      </setAdbConfigContext.Provider>
    </adbConfigContext.Provider>
  )
}
