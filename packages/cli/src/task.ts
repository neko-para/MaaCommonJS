import fs from 'fs'
import path from 'path'
import {
  AdbControllerType,
  Maa,
  MaaController,
  MaaInstance,
  MaaResource
} from '@maa/loader'
import { MaaCallback } from '@maa/loader/src/proxy.js'
import { config } from './config.js'

export interface Task {
  name: string
  type: string
  param?: Record<string, unknown>
}

export interface TaskTemplate {
  desc: string
  type: string
  param?: Record<string, unknown>
}

export async function runTask(assets: string, tasks: Task[]) {
  console.log('running!')
  const root = path.join(process.cwd(), assets)

  Maa.setLogging(path.join(root, 'debug'))

  const adbConfig = fs.readFileSync(
    path.join(root, 'resource', 'controller_config.json'),
    'utf-8'
  )

  const logCallback: MaaCallback = (msg, details) => {
    // console.log(msg, details)
  }

  const hMaa = MaaInstance.create(logCallback)
  const hRes = MaaResource.create(logCallback)
  const hCtrl = MaaController.createAdb(
    config.adb,
    config.address,
    AdbControllerType.Input_Preset_Adb |
      AdbControllerType.Screencap_RawWithGzip,
    adbConfig,
    logCallback
  )

  hMaa.bind(hRes)
  hMaa.bind(hCtrl)

  hCtrl.setHeight(720)

  await hRes.load(path.join(root, 'resource'))
  await hCtrl.connect()

  if (!hMaa.inited()) {
    hMaa.release()
    hRes.release()
    hCtrl.release()
    return false
  }

  const props = tasks
    .map(task => hMaa.run(task.type, task.param ?? {}))
    .map(x => x.result)
  await Promise.all(props)
  hMaa.release()
  hRes.release()
  hCtrl.release()
  return true
}
