import koffi from 'koffi'

export const MaaRect = koffi.struct('Rect', {
  x: 'int32',
  y: 'int32',
  width: 'int32',
  height: 'int32'
})

export const MaaImage = koffi.struct('Image', {
  rows: 'int32',
  cols: 'int32',
  type: 'int32',
  data: 'void*'
})

export const MaaRecognitionResult = koffi.struct('RecognitionResult', {
  box: MaaRect,
  detail: 'char [1048560]'
})

export const MaaRecognizerAnalyzeCallback = koffi.proto(
  'uint8 MaaRecognizerAnalyzeCallback(RecognitionResult*, const Image*, const char*)'
)

export const MaaCustomRecognizerAPI = koffi.struct('CustomRecognizerAPI', {
  analyze: 'MaaRecognizerAnalyzeCallback*'
})

export const MaaActionRunCallback = koffi.proto(
  'uint8 MaaActionRunCallback(const char*, const Rect*, const char*)'
)

export const MaaActionStopCallback = koffi.proto(
  'uint8 MaaActionStopCallback()'
)

export const MaaCustomActionAPI = koffi.struct('CustomActionAPI', {
  run: 'MaaActionRunCallback*',
  stop: 'MaaActionStopCallback*'
})

export const MaaCallback = koffi.proto(
  'void MaaCallback(const char*, const char*, intptr)'
)

export type MaaCallback = (
  msg: string,
  details: Record<string, unknown>
) => void

const funcTable = {
  ResourceCreate: 'ResourceHandle* MaaResourceCreate(MaaCallback*, intptr)',
  ResourceDestroy: 'void MaaResourceDestroy(ResourceHandle*)',
  ResourcePostResource:
    'int64 MaaResourcePostResource(ResourceHandle*, const char*)',
  // useless:
  // ResourceStatus: 'int32 MaaResourceStatus(ResourceHandle*, int64)',
  // deadlock:
  // ResourceWait: 'int32 MaaResourceWait(ResourceHandle*, int64)',
  ResourceLoaded: 'uint8 MaaResourceLoaded(ResourceHandle*)',
  // ResourceSetOptionInt32:
  //   'uint8 MaaResourceSetOption(ResourceHandle*, int32, const int32*, uint64)',
  // ResourceSetOptionString:
  //   'uint8 MaaResourceSetOption(ResourceHandle*, int32, const char*, uint64)',
  ResourceGetHash:
    'uint64 MaaResourceGetHash(ResourceHandle*, _Out_ char*, uint64)',

  AdbControllerCreate:
    'ControllerHandle* MaaAdbControllerCreate(const char*, const char*, int32, const char*, MaaCallback*, intptr)',
  // custom controller, thrift controller
  ControllerDestroy: 'void MaaControllerDestroy(ControllerHandle*)',
  ControllerSetOptionInt32:
    'uint8 MaaControllerSetOption(ControllerHandle*, int32, const int32*, uint64)',
  ControllerSetOptionString:
    'uint8 MaaControllerSetOption(ControllerHandle*, int32, const char*, uint64)',
  ControllerPostConnection:
    'int64 MaaControllerPostConnection(ControllerHandle*)',
  ControllerPostClick:
    'int64 MaaControllerPostClick(ControllerHandle*, int32, int32)',
  ControllerPostSwipe:
    'int64 MaaControllerPostSwipe(ControllerHandle*, const int32*, const int32*, const int32*, uint64)',
  ControllerPostScreencap:
    'int64 MaaControllerPostScreencap(ControllerHandle*)',
  // useless
  // ControllerStatus: 'int32 MaaControllerStatus(ControllerHandle*, int64)',
  // deadlock
  // ControllerWait: 'void MaaControllerWait(ControllerHandle*, int64)',
  ControllerConnected: 'uint8 MaaControllerConnected(ControllerHandle*)',
  ControllerGetImage:
    'uint64 MaaControllerGetImage(ControllerHandle*, _Out_ void*, uint64)',
  ControllerGetUUID:
    'uint64 MaaControllerGetUUID(ControllerHandle*, _Out_ char*, uint64)',

  Create: 'InstanceHandle* MaaCreate(MaaCallback*, intptr)',
  Destroy: 'void MaaDestroy(InstanceHandle*)',
  // InstanceSetOptionInt32:
  //   'uint8 MaaInstanceSetOption(InstanceHandle*, int32, const int32*, uint64)',
  // InstanceSetOptionString:
  //   'uint8 MaaInstanceSetOption(InstanceHandle*, int32, const char*, uint64)',
  BindResource: 'uint8 MaaBindResource(InstanceHandle*, ResourceHandle*)',
  BindController: 'uint8 MaaBindController(InstanceHandle*, ControllerHandle*)',
  Inited: 'uint8 MaaInited(InstanceHandle*)',

  RegisterCustomRecognizer:
    'uint8 MaaRegisterCustomRecognizer(InstanceHandle*, const char*, CustomRecognizerAPI*)',
  UnregisterCustomRecognizer:
    'uint8 MaaUnregisterCustomRecognizer(InstanceHandle*, const char*)',
  ClearCustomRecognizer: 'uint8 MaaClearCustomRecognizer(InstanceHandle*)',

  RegisterCustomAction:
    'uint8 MaaRegisterCustomAction(InstanceHandle*, const char*, CustomActionAPI*)',
  UnregisterCustomAction:
    'uint8 MaaUnregisterCustomAction(InstanceHandle*, const char*)',
  ClearCustomAction: 'uint8 MaaClearCustomAction(InstanceHandle*)',

  // custom task related
  PostTask: 'int64 MaaPostTask(InstanceHandle*, const char*, const char*)',
  SetTaskParam: 'uint8 MaaSetTaskParam(InstanceHandle*, int64, const char*)',
  // useless:
  // TaskStatus: 'int32 MaaTaskStatus(InstanceHandle*, int64)',
  // deadlock:
  // TaskWait: 'int32 MaaTaskWait(InstanceHandle*, int64)',
  TaskAllFinished: 'uint8 MaaTaskAllFinished(InstanceHandle*)',
  Stop: 'void MaaStop(InstanceHandle*)',
  // useless:
  // GetResource: 'ResourceHandle* MaaGetResource(InstanceHandle*)',
  // GetController: 'ControllerHandle* MaaGetController(InstanceHandle*)',

  Version: 'const char* MaaVersion()',
  SetGlobalOptionString: 'uint8 MaaSetGlobalOption(int32, const char*, uint64)'
}

export function load(path: string) {
  const lib = koffi.load(path)

  koffi.opaque('ResourceHandle')
  koffi.opaque('ControllerHandle')
  koffi.opaque('InstanceHandle')

  const res: Record<string, koffi.KoffiFunction> = {}
  for (const key in funcTable) {
    res[key] = lib.func(funcTable[key as keyof typeof funcTable])
  }
  return res as Record<keyof typeof funcTable, koffi.KoffiFunction>
}
