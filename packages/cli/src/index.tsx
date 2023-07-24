import { config, loadConfig, saveConfig } from './config.js'
import { runTask } from './task.js'
import * as _1999 from './1999.js'
import React from 'react'
import { render } from 'ink'
import { App } from './App.js'

loadConfig()

render(<App />)
