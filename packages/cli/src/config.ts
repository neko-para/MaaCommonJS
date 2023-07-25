import { Task, TaskTemplate } from './task.js'
import * as _1999 from './1999.js'

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
    templates: Record<string, TaskTemplate>
    assets: string
  }
> = {
  '1999': _1999
}
