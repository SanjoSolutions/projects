import { PriorityQueue } from './PriorityQueue.js'
import { Task } from './Task.js'

describe('PriorityQueue', () => {
  test('it is possible to prioritize tasks', () => {
    const queue = new PriorityQueue()
    const task = new Task('…', { priority: 50 })
    const highPriorityTask = new Task('…', { priority: 1 })
    queue.queueTask(task)
    queue.queueTask(highPriorityTask)
    const highestPriorityTask = queue.getHighestPriorityTask()
    expect(highestPriorityTask).toBe(highPriorityTask)
  })

  it('puts new tasks behind the existing tasks in the queue that have the same priority', () => {
    const queue = new PriorityQueue()
    const task = new Task('…', { priority: 50 })
    const samePriorityTask = new Task('…', { priority: 50 })
    queue.queueTask(task)
    queue.queueTask(samePriorityTask)
    expect(queue.getTask(0)).toBe(task)
    expect(queue.getTask(1)).toBe(samePriorityTask)
  })
})
