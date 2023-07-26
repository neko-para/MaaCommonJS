import { useFocus, useInput } from 'ink'
import React, { useEffect } from 'react'
import { Text } from 'ink'
import { PropsWithChildren } from 'react'

export type Props = {
  text: string
  onClick: () => void
  onFocus: () => void
}

export default function Button(props: Props) {
  const { isFocused } = useFocus()
  useInput((input, key) => {
    if (!isFocused) {
      return
    }
    if (key.return) {
      props.onClick()
    }
  })
  useEffect(() => {
    if (isFocused) {
      props.onFocus()
    }
  }, [isFocused])

  return <Text underline={isFocused}>{props.text}</Text>
}
