import React, { useContext, useEffect } from 'react'
import Group from '../components/Group.js'
import InkSelectInput from 'ink-select-input'
import {
  globalConfigContext,
  setGlobalConfigContext,
  setHelpInfoContext
} from '../state.js'
import { Preset } from '../config.js'
import { useFocus } from 'ink'

export default function GameTargetView() {
  const { isFocused } = useFocus()
  const globalConfig = useContext(globalConfigContext)
  const setGlobalConfig = useContext(setGlobalConfigContext)
  const setHelpInfo = useContext(setHelpInfoContext)

  useEffect(() => {
    if (isFocused) {
      setHelpInfo({
        desc: '配置目标游戏',
        key: [['上下键', '切换游戏']]
      })
    }
  }, [isFocused])

  const items = Object.keys(Preset).map(x => ({
    label: `${x} - ${Preset[x]!.assets}`,
    value: x
  }))

  const switchGame = (item: { label: string; value: string }) => {
    setGlobalConfig(cfg => {
      cfg.game = item.value
    })
  }

  return (
    <Group title="目标">
      <InkSelectInput
        isFocused={isFocused}
        items={items}
        initialIndex={items.findIndex(x => x.value === globalConfig.game)}
        onSelect={switchGame}
      ></InkSelectInput>
    </Group>
  )
}
