import { createContext } from 'react'
import { Task } from './task.js'
import { Updater } from 'use-immer'

export type AdbConfig = {
  readonly adb: string
  readonly address: string
}

export const adbConfigContext = createContext<AdbConfig>({
  adb: '',
  address: ''
})

export const setAdbConfigContext = createContext<Updater<AdbConfig>>(() => {})

export type GlobalConfig = {
  readonly game: string
}

export const globalConfigContext = createContext<GlobalConfig>({
  game: ''
})

export const setGlobalConfigContext = createContext<Updater<GlobalConfig>>(
  () => {}
)

export type TaskInfo = {
  readonly [game in string]?: Task[]
}

export const taskInfoContext = createContext<TaskInfo>({})

export const setTaskInfoContext = createContext<Updater<TaskInfo>>(() => {})

export type LogInfo = {
  readonly log: string[]
}

export const logInfoContext = createContext<LogInfo>({ log: [] })

export const setLogInfoContext = createContext<Updater<LogInfo>>(() => {})
