import { describe, it } from '@jest/globals'
import { resolveOrder } from './resolveOrder.js'
import { Task } from './Task.js'

describe('planning DSL (domain specific language)', () => {
  describe('declareThatTaskDependsOnCompletionOf', () => {
    const task1 = new Task()
    const task2 = new Task()
    task2.declareThatTaskDependsOnCompletionOf(task1)
    expect(task2.getTasksItDependsOnCompletionOf()).toEqual(new Set([task1]))
  })

  describe('dependency support', () => {
    it('supports declaring that a task is dependent on the completion of another task before it can be started', () => {
      const task1 = new Task()
      const task2 = new Task()
      task2.declareThatTaskDependsOnCompletionOf(task1)
      const taskOrder = resolveOrder(new Set([task1, task2]))
      expect(taskOrder).toEqual([task1, task2])
    })

    it('supports declaring that a task is dependent on the completion of another task before it can be started (2)', () => {
      const task1 = new Task()
      const task2 = new Task()
      task1.declareThatTaskDependsOnCompletionOf(task2)
      const taskOrder = resolveOrder(new Set([task1, task2]))
      expect(taskOrder).toEqual([task2, task1])
    })

    it('supports declaring that a task is dependent on the completion of another task before it can be started (3)', () => {
      const task1 = new Task()
      const task2 = new Task()
      const task3 = new Task()
      task2.declareThatTaskDependsOnCompletionOf(task1)
      task3.declareThatTaskDependsOnCompletionOf(task2)
      const taskOrder = resolveOrder(new Set([task1, task2, task3]))
      expect(taskOrder).toEqual([task1, task2, task3])
    })
  })
})
