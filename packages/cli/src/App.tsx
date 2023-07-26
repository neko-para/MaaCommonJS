import fs from 'fs'
import React, { useEffect } from 'react'
import {
  GlobalConfig,
  HelpInfo,
  LogInfo,
  TaskRunningState,
  globalConfigContext,
  helpInfoContext,
  logInfoContext,
  setGlobalConfigContext,
  setHelpInfoContext,
  setLogInfoContext,
  setTaskRunningStateContext,
  taskRunningStateContext
} from './state.js'
import { useImmer } from 'use-immer'
import { Config } from './config.js'
import ConfigView from './views/ConfigView.js'
import ActionView from './views/ActionView.js'
import { Box } from 'ink'
import TaskInfoView from './views/TaskInfoView.js'
import LogView from './views/LogView.js'
import TaskRunningView from './views/TaskRunningView.js'
import GameTargetView from './views/GameTargetView.js'
import HelpView from './views/HelpView.js'

export function App() {
  const [globalConfig, setGlobalConfig] = useImmer<GlobalConfig>({
    adb: 'adb' + (process.platform === 'win32' ? '.exe' : ''),
    address: '127.0.0.1:5555',
    game: '1999',
    tasks: {}
  })
  const [taskRunningState, setTaskRunningState] = useImmer<TaskRunningState>({
    tasks: []
  })
  const [helpInfo, setHelpInfo] = useImmer<HelpInfo>({
    desc: '',
    key: []
  })
  const [logInfo, setLogInfo] = useImmer<LogInfo>({ log: [] })

  useEffect(() => {
    if (fs.existsSync('config.json')) {
      const res: Config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))
      setGlobalConfig(res)
    }
  }, [])
  useEffect(() => {
    fs.writeFileSync(
      'config.json',
      JSON.stringify(
        {
          ...globalConfig
        },
        null,
        2
      )
    )
  }, [globalConfig])

  return (
    <globalConfigContext.Provider value={globalConfig}>
      <setGlobalConfigContext.Provider value={setGlobalConfig}>
        <taskRunningStateContext.Provider value={taskRunningState}>
          <setTaskRunningStateContext.Provider value={setTaskRunningState}>
            <helpInfoContext.Provider value={helpInfo}>
              <setHelpInfoContext.Provider value={setHelpInfo}>
                <logInfoContext.Provider value={logInfo}>
                  <setLogInfoContext.Provider value={setLogInfo}>
                    <Box>
                      <Box flexDirection="column">
                        <GameTargetView></GameTargetView>
                        <ConfigView></ConfigView>
                        <ActionView></ActionView>
                        <TaskInfoView></TaskInfoView>
                        <TaskRunningView></TaskRunningView>
                      </Box>
                      <LogView></LogView>
                    </Box>
                    <HelpView></HelpView>
                  </setLogInfoContext.Provider>
                </logInfoContext.Provider>
              </setHelpInfoContext.Provider>
            </helpInfoContext.Provider>
          </setTaskRunningStateContext.Provider>
        </taskRunningStateContext.Provider>
      </setGlobalConfigContext.Provider>
    </globalConfigContext.Provider>
  )
}
