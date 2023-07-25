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

export interface Task {
  name: string
  enable: boolean
  type: string
  param?: Record<string, unknown>
}

export interface TaskTemplate {
  desc: string
  param?: Record<string, unknown>
}

export async function runTask(
  assets: string,
  adb: string,
  address: string,
  tasks: Task[],
  logger: (msg: string, details: Record<string, unknown>) => void,
  status: {
    add(name: string): Promise<number>
    set(idx: number, status: 'pending' | 'loading' | 'success' | 'error'): void
  }
) {
  const root = path.join(process.cwd(), assets)

  Maa.setLogging(path.join(root, 'debug'))

  const adbConfig = fs.readFileSync(
    path.join(root, 'resource', 'controller_config.json'),
    'utf-8'
  )

  const logCallback: MaaCallback = (msg, details) => {
    logger(msg, details)
  }

  const hMaa = MaaInstance.create(logCallback)
  const hRes = MaaResource.create(logCallback)
  const hCtrl = MaaController.createAdb(
    adb,
    address,
    AdbControllerType.Input_Preset_Adb |
      AdbControllerType.Screencap_RawWithGzip,
    adbConfig,
    logCallback
  )

  hMaa.bind(hRes)
  hMaa.bind(hCtrl)

  hCtrl.setHeight(720)

  const iLoad = await status.add('load resource')
  const iConnect = await status.add('connect to emulator')
  const iInited = await status.add('check inited')

  status.set(iLoad, 'loading')
  if (!(await hRes.load(path.join(root, 'resource')))) {
    status.set(iLoad, 'error')
    hMaa.release()
    hRes.release()
    hCtrl.release()
    return false
  } else {
    status.set(iLoad, 'success')
  }

  status.set(iConnect, 'loading')
  if (!(await hCtrl.connect())) {
    status.set(iConnect, 'error')
    hMaa.release()
    hRes.release()
    hCtrl.release()
    return false
  } else {
    status.set(iConnect, 'success')
  }

  status.set(iInited, 'loading')
  if (!hMaa.inited()) {
    status.set(iInited, 'error')
    hMaa.release()
    hRes.release()
    hCtrl.release()
    return false
  } else {
    status.set(iInited, 'success')
  }

  const iTasks: number[] = []
  for (const task of tasks) {
    iTasks.push(await status.add(`running task ${task.name}`))
  }

  for (const [idx, task] of tasks.entries()) {
    const id = iTasks[idx]!
    status.set(id, 'loading')
    const res = hMaa.run(task.type, task.param ?? {})
    if (!(await res.result)) {
      status.set(id, 'error')
      hMaa.release()
      hRes.release()
      hCtrl.release()
      return false
    } else {
      status.set(id, 'success')
    }
  }

  hMaa.release()
  hRes.release()
  hCtrl.release()
  return true
}
