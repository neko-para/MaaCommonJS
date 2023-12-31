import koffi from 'koffi'
import { MaaCallback, load } from './proxy.js'
import { ControllerOption, GlobalOption } from './enum.js'
import path from 'path'

const plat = process.platform
const name: Record<string, string> = {
  win32: 'MaaFramework.dll',
  linux: './bin/libMaaFramework.so',
  darwin: './bin/libMaaFramework.dylib'
}

if (plat === 'win32') {
  const kernel = koffi.load('kernel32.dll')
  kernel.stdcall('int32 SetDefaultDllDirectories(uint32)')(0x1000)
  kernel.stdcall('int32 AddDllDirectory(str16)')(
    path.join(process.cwd(), 'bin')
  )
}

const lib = load(name[plat]!)

export class Maa {
  static setLogging(path: string) {
    return !!lib.SetGlobalOptionString(GlobalOption.Logging, path, path.length)
  }
  static version(): string {
    return lib.Version()
  }
}

export class MaaController {
  handle: object
  callback: koffi.IKoffiRegisteredCallback

  task: {
    [id: string]: {
      promise: Promise<boolean>
      resolve: (res: boolean) => void
      state: 'pending' | 'started' | 'completed' | 'failed'
    }
  }

  constructor(handle: object, callback: koffi.IKoffiRegisteredCallback) {
    this.handle = handle
    this.callback = callback
    this.task = {}
  }

  release() {
    lib.ControllerDestroy(this.handle)
    koffi.unregister(this.callback)
  }

  static createAdb(
    adb: string,
    address: string,
    type: number,
    config: string,
    callback: MaaCallback
  ): MaaController {
    let inst: MaaController | null = null
    const cb = koffi.register((msg: string, detail: string) => {
      const dt = JSON.parse(detail)
      const task = inst?.task[`${dt?.id}`]
      if (task) {
        switch (msg) {
          case 'Controller.Action.Started':
            task.state = 'started'
            break
          case 'Controller.Action.Completed':
            task.state = 'completed'
            task.resolve(true)
            break
          case 'Controller.Action.Failed':
            task.state = 'failed'
            task.resolve(false)
            break
        }
      }
      // TODO: delete from task
      callback(msg, dt)
    }, koffi.pointer(MaaCallback))
    inst = new MaaController(
      lib.AdbControllerCreate(adb, address, type, config, cb, 0),
      cb
    )
    return inst
  }

  wait(id: number | bigint): Promise<boolean> {
    const sid = `${id}`
    if (sid in this.task) {
      return this.task[sid]!.promise
    } else {
      const [pro, res] = (() => {
        let r: (s: boolean) => void = () => {}
        const p = new Promise<boolean>(resolve => {
          r = resolve
        })
        return [p, r]
      })()
      this.task[sid] = {
        promise: pro,
        resolve: res,
        state: 'pending'
      }
      return pro
    }
  }

  setWidth(width: number) {
    return !!lib.ControllerSetOptionInt32(
      this.handle,
      ControllerOption.ScreenshotTargetWidth,
      [width],
      4
    )
  }

  setHeight(height: number) {
    return !!lib.ControllerSetOptionInt32(
      this.handle,
      ControllerOption.ScreenshotTargetHeight,
      [height],
      4
    )
  }

  setPackageEntry(entry: string) {
    return !!lib.ControllerSetOptionString(
      this.handle,
      ControllerOption.DefaultAppPackageEntry,
      entry,
      entry.length
    )
  }

  setPackage(pkg: string) {
    return !!lib.ControllerSetOptionString(
      this.handle,
      ControllerOption.DefaultAppPackage,
      pkg,
      pkg.length
    )
  }

  connect() {
    return this.wait(lib.ControllerPostConnection(this.handle))
  }

  click(x: number, y: number) {
    return this.wait(lib.ControllerPostClick(this.handle, x, y))
  }

  swipe(xs: number[], ys: number[], delays: number[]) {
    const size = Math.min(xs.length, ys.length, delays.length)
    return this.wait(lib.ControllerPostSwipe(this.handle, xs, ys, delays, size))
  }

  async screencap(): Promise<Buffer | null> {
    if (await this.wait(lib.ControllerPostScreencap(this.handle))) {
      const size = 3 << 20
      const buf = Buffer.allocUnsafe(size)
      const rsize = lib.ControllerGetImage(this.handle, buf, size)
      if (rsize === 0xffffffffffffffffn) {
        return null
      } else {
        return buf
      }
    } else {
      return null
    }
  }

  connected() {
    return !!lib.ControllerConnected(this.handle)
  }

  uuid() {
    let out = ['\0'.repeat(66)]
    const rsize = lib.ControllerGetUUID(this.handle, out, 65)
    if (rsize === 0xffffffffffffffffn) {
      return null
    } else {
      return out[0]
    }
  }
}

export class MaaResource {
  handle: object
  callback: koffi.IKoffiRegisteredCallback

  task: {
    [id: string]: {
      promise: Promise<boolean>
      resolve: (res: boolean) => void
      state: 'pending' | 'started' | 'completed' | 'failed'
    }
  }

  constructor(handle: object, callback: koffi.IKoffiRegisteredCallback) {
    this.handle = handle
    this.callback = callback
    this.task = {}
  }

  release() {
    lib.ResourceDestroy(this.handle)
    koffi.unregister(this.callback)
  }

  static create(callback: MaaCallback): MaaResource {
    let inst: MaaResource | null = null
    const cb = koffi.register((msg: string, detail: string) => {
      const dt = JSON.parse(detail)
      const task = inst?.task[`${dt?.id}`]
      if (task) {
        switch (msg) {
          case 'Resource.StartLoading':
            task.state = 'started'
            break
          case 'Resource.LoadingCompleted':
            task.state = 'completed'
            task.resolve(true)
            break
          case 'Resource.LoadingError':
            task.state = 'failed'
            task.resolve(false)
            break
        }
      }
      // TODO: delete from task
      callback(msg, dt)
    }, koffi.pointer(MaaCallback))
    inst = new MaaResource(lib.ResourceCreate(cb, 0), cb)
    return inst
  }

  wait(id: number | bigint): Promise<boolean> {
    const sid = `${id}`
    if (sid in this.task) {
      return this.task[sid]!.promise
    } else {
      const [pro, res] = (() => {
        let r: (s: boolean) => void = () => {}
        const p = new Promise<boolean>(resolve => {
          r = resolve
        })
        return [p, r]
      })()
      this.task[sid] = {
        promise: pro,
        resolve: res,
        state: 'pending'
      }
      return pro
    }
  }

  load(path: string) {
    return this.wait(lib.ResourcePostResource(this.handle, path))
  }
}

export class MaaInstance {
  handle: object
  callback: koffi.IKoffiRegisteredCallback

  task: {
    [id: string]: {
      promise: Promise<boolean>
      resolve: (res: boolean) => void
      state: 'pending' | 'started' | 'completed' | 'failed' | 'stopped'
    }
  }

  constructor(handle: object, callback: koffi.IKoffiRegisteredCallback) {
    this.handle = handle
    this.callback = callback
    this.task = {}
  }

  release() {
    lib.Destroy(this.handle)
    koffi.unregister(this.callback)
  }

  static create(callback: MaaCallback): MaaInstance {
    let inst: MaaInstance | null = null
    const cb = koffi.register((msg: string, detail: string) => {
      const dt = JSON.parse(detail)
      const task = inst?.task[`${dt?.id}`]
      if (task) {
        switch (msg) {
          case 'Task.Started':
            task.state = 'started'
            break
          case 'Task.Completed':
            task.state = 'completed'
            task.resolve(true)
            break
          case 'Task.Failed':
            task.state = 'failed'
            task.resolve(false)
            break
          case 'Task.Stopped':
            task.state = 'stopped'
            task.resolve(false)
            break
        }
      }
      // TODO: delete from task
      callback(msg, dt)
    }, koffi.pointer(MaaCallback))
    inst = new MaaInstance(lib.Create(cb, 0), cb)
    return inst
  }

  wait(id: number | bigint): Promise<boolean> {
    const sid = `${id}`
    if (sid in this.task) {
      return this.task[sid]!.promise
    } else {
      const [pro, res] = (() => {
        let r: (s: boolean) => void = () => {}
        const p = new Promise<boolean>(resolve => {
          r = resolve
        })
        return [p, r]
      })()
      this.task[sid] = {
        promise: pro,
        resolve: res,
        state: 'pending'
      }
      return pro
    }
  }

  bind(inst: MaaResource | MaaController) {
    if (inst instanceof MaaController) {
      return !!lib.BindController(this.handle, inst.handle)
    } else if (inst instanceof MaaResource) {
      return !!lib.BindResource(this.handle, inst.handle)
    } else {
      return false
    }
  }

  inited() {
    return !!lib.Inited(this.handle)
  }

  run(name: string, param: Record<string, unknown>) {
    const id = lib.PostTask(this.handle, name, JSON.stringify(param))
    return {
      id,
      result: this.wait(id),

      setParam: (param: Record<string, unknown>) => {
        return !!lib.SetTaskParam(this.handle, id, JSON.stringify(param))
      }
    }
  }

  allFinished() {
    return !!lib.TaskAllFinished(this.handle)
  }

  stop() {
    lib.Stop(this.handle)
  }
}
