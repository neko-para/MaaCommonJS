import { createContext } from 'react'
import { Task } from './task.js'
import { Updater } from 'use-immer'

export type GlobalConfig = {
  readonly adb: string
  readonly address: string
  readonly game: string
  readonly tasks: {
    readonly [game in string]?: Task[]
  }
}

export const globalConfigContext = createContext<GlobalConfig>({
  adb: '',
  address: '',
  game: '',
  tasks: {}
})

export const setGlobalConfigContext = createContext<Updater<GlobalConfig>>(
  () => {}
)

export type TaskRunningState = {
  readonly tasks: {
    name: string
    state: 'pending' | 'loading' | 'success' | 'error'
  }[]
}

export const taskRunningStateContext = createContext<TaskRunningState>({
  tasks: []
})

export const setTaskRunningStateContext = createContext<
  Updater<TaskRunningState>
>(() => {})

export type HelpInfo = {
  readonly desc: string
  readonly key: [string, string][]
}

export const helpInfoContext = createContext<HelpInfo>({
  desc: '',
  key: []
})

export const setHelpInfoContext = createContext<Updater<HelpInfo>>(() => {})

export type LogInfo = {
  readonly log: string[]
}

export const logInfoContext = createContext<LogInfo>({ log: [] })

export const setLogInfoContext = createContext<Updater<LogInfo>>(() => {})
