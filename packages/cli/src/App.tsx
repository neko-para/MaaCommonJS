import fs from 'fs'
import React, { useEffect } from 'react'
import {
  GlobalConfig,
  LogInfo,
  globalConfigContext,
  logInfoContext,
  setGlobalConfigContext,
  setLogInfoContext
} from './state.js'
import { useImmer } from 'use-immer'
import { Config } from './config.js'
import ConfigView from './views/ConfigView.js'
import ActionView from './views/ActionView.js'
import { Box } from 'ink'
import TaskInfoView from './views/TaskInfoView.js'
import LogView from './views/LogView.js'

export function App() {
  const [globalConfig, setGlobalConfig] = useImmer<GlobalConfig>({
    adb: 'adb' + (process.platform === 'win32' ? '.exe' : ''),
    address: '127.0.0.1:5555',
    game: '1999',
    tasks: {}
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
      </setGlobalConfigContext.Provider>
    </globalConfigContext.Provider>
  )
}
