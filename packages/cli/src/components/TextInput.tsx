import React from 'react'
import { useFocus } from 'ink'
import InkTextInput from 'ink-text-input'

export type Props = {
  value: string
  onChange: (v: string) => void
}

export default function TextInput(props: Props) {
  const { isFocused } = useFocus()

  return (
    <InkTextInput
      value={props.value}
      onChange={props.onChange}
      focus={isFocused}
    ></InkTextInput>
  )
}
