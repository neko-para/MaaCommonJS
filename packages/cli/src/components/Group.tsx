import { Box, Text } from 'ink'
import React from 'react'
import { PropsWithChildren } from 'react'

export type Props = {
  title: string
}

export default function Group(props: PropsWithChildren<Props>) {
  return (
    <Box flexDirection="column" borderStyle="single">
      <Box marginTop={-1}>
        <Text>{props.title}</Text>
      </Box>
      <Box marginLeft={1} marginRight={1}>
        {props.children}
      </Box>
    </Box>
  )
}
