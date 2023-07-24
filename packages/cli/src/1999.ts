import { TaskTemplate } from './task.js'

export const templates: TaskTemplate[] = [
  {
    desc: '收取荒原',
    type: 'Wilderness'
  },
  {
    desc: '领取奖励',
    type: 'Awards'
  },
  {
    desc: '每日心相（意志解析）',
    type: 'Psychube'
  },
  {
    desc: '3-9 厄险（百灵百验鸟）',
    type: 'Combat',
    param: {
      diff_task: {
        EnterTheShow: {
          next: 'MainChapter_3'
        },
        TargetStageName: {
          text: '09'
        },
        StawgeDifficulty: {
          next: 'StageDifficulty_Hard'
        },
        SetReplaysTimes: {
          text: '1'
        }
      }
    }
  }
]

export const assets = 'assets'
