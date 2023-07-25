import { useFocus, useInput } from 'ink'
import React from 'react'
import { Text } from 'ink'
import { PropsWithChildren } from 'react'

export type Props = {
  text: string
  onClick: () => void
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

  return <Text underline={isFocused}>{props.text}</Text>
}
