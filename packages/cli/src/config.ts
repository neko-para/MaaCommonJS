import fs from 'fs'
import { Task, TaskTemplate } from './task.js'

export interface Config {
  adb: string
  address: string
  game: string
  tasks: {
    [game in string]?: Task[]
  }
}

export const Preset: Record<
  string,
  {
    templates: TaskTemplate[]
    assets: string
  }
> = JSON.parse(fs.readFileSync('preset.json', 'utf-8'))
