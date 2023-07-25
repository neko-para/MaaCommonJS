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

export type LogInfo = {
  readonly log: string[]
}

export const logInfoContext = createContext<LogInfo>({ log: [] })

export const setLogInfoContext = createContext<Updater<LogInfo>>(() => {})
