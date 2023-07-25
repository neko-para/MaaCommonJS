import { loadConfig } from './config.js'
import React, { StrictMode } from 'react'
import { render } from 'ink'
import { App } from './App.js'

loadConfig()

render(
  <StrictMode>
    <App />
  </StrictMode>
)

export {}
