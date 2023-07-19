export const enum AdbControllerType {
  Touch_Adb = 1,
  Touch_MiniTouch = 2,
  Touch_MaaTouch = 3,
  Touch_Mask = 0xff,

  Key_Adb = 1 << 8,
  Key_MaaTouch = 2 << 8,
  Key_Mask = 0xff00,

  Screencap_FastestWay = 1 << 16,
  Screencap_RawByNetcat = 2 << 16,
  Screencap_RawWithGzip = 3 << 16,
  Screencap_Encode = 4 << 16,
  Screencap_EncodeToFile = 5 << 16,
  Screencap_MinicapDirect = 6 << 16,
  Screencap_MinicapStream = 7 << 16,
  Screencap_Mask = 0xff0000,

  Input_Preset_Adb = Touch_Adb | Key_Adb,
  Input_Preset_Minitouch = Touch_MiniTouch | Key_Adb,
  Input_Preset_Maatouch = Touch_MaaTouch | Key_MaaTouch
}

export const enum GlobalOption {
  Logging = 1
}

export const enum ControllerOption {
  ScreenshotTargetWidth = 1,
  ScreenshotTargetHeight = 2,
  DefaultAppPackageEntry = 3,
  DefaultAppPackage = 4
}
