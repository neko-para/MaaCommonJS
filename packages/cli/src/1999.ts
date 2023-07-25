import { TaskTemplate } from './task.js'

export const templates: Record<string, TaskTemplate> = {
  Wilderness: {
    desc: '收取荒原'
  },
  Awards: {
    desc: '领取奖励'
  },
  Psychube: {
    desc: '每日心相（意志解析）'
  },
  Combat: {
    desc: '3-9 厄险（百灵百验鸟）',
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
}

export const assets = 'assets'
