import { TaskList as InkTaskList, Task as InkTask } from 'ink-task-list'
import Group from '../components/Group.js'
import React, { useContext } from 'react'
import { taskRunningStateContext } from '../state.js'
import spinners from 'cli-spinners'

export default function TaskRunningView() {
  const taskRunningState = useContext(taskRunningStateContext)
  return (
    <Group title="执行进度">
      {taskRunningState.tasks.length > 0 ? (
        <InkTaskList>
          {taskRunningState.tasks.map(task => {
            return task.state === 'loading' ? (
              <InkTask
                key={task.name}
                state={task.state}
                label={task.name}
                spinner={spinners.dots}
              ></InkTask>
            ) : (
              <InkTask
                key={task.name}
                state={task.state}
                label={task.name}
              ></InkTask>
            )
          })}
        </InkTaskList>
      ) : (
        <></>
      )}
    </Group>
  )
}
