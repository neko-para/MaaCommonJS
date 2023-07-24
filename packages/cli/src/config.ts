import fs from 'fs'
import { Task } from './task.js'
import { templates, assets } from './1999.js'

interface Config {
  adb: string
  address: string
  game: '1999'
  tasks: Record<string, Task[]>
}

export const Games = {
  '1999': {
    templates,
    assets
  }
}

export const config: Config = {
  adb: 'adb' + (process.platform === 'win32' ? '.exe' : ''),
  address: '127.0.0.1',
  game: '1999',
  tasks: {}
}

export function loadConfig() {
  if (fs.existsSync('config.json')) {
    const res: Config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))
    config.adb = res.adb
    config.address = res.address
    config.game = res.game
    config.tasks = res.tasks

    // config.tasks[config.game] = Games[config.game].templates.map((x, i) => ({
    //   name: `Task ${i + 1}`,
    //   type: x.type,
    //   param: x.param
    // }))
  }
}

export function saveConfig() {
  fs.writeFileSync('config.json', JSON.stringify(config, null, 2))
}
