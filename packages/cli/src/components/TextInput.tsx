import React, { useEffect } from 'react'
import { useFocus } from 'ink'
import InkTextInput from 'ink-text-input'

export type Props = {
  value: string
  onChange: (v: string) => void
  onFocus: () => void
}

export default function TextInput(props: Props) {
  const { isFocused } = useFocus()

  useEffect(() => {
    if (isFocused) {
      props.onFocus()
    }
  }, [isFocused])

  return (
    <InkTextInput
      value={props.value}
      onChange={props.onChange}
      focus={isFocused}
    ></InkTextInput>
  )
}
