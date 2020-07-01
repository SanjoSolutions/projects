import binarySearch from '@sanjo/binary-search'

class Queue {
  #tasks: Task[]

  constructor () {
    this.#tasks = []
  }

  queueTask (task: Task) {
    const { index } = binarySearch<Task>(this.#tasks, taskInsertCompareFn, task)
    this.#tasks.splice(index + 1, 0, task)
  }

  getTask (index: number): Task | null {
    return this.#tasks[index] || null
  }

  getHighestPriorityTask (): Task | null {
    return this.#tasks[0] || null
  }
}

function taskInsertCompareFn (value: Task, valueAtIndex: Task) {
  const valuePriority = value.priority
  const valueAtIndexPriority = valueAtIndex.priority
  return (
    valuePriority <= valueAtIndexPriority
      ? valuePriority - valueAtIndexPriority
      : 0
  )
}

function taskPriorityCompareFn (a: Task, b: Task): number {
  return a.priority - b.priority
}

class Task {
  #name: string
  #options: TaskOptions

  constructor (name: string, options: TaskOptions) {
    this.#name = name
    this.#options = options
  }

  get priority () {
    return this.#options.priority
  }
}

interface TaskOptions {
  priority: number // [1;100]. 1 highest priority.
}

// Queue for tasks with prioritization
describe('Queue', () => {
  it('is possible to prioritize tasks', () => {
    const queue = new Queue()
    const task = new Task('…', { priority: 50 })
    const highPriorityTask = new Task('…', { priority: 1 })
    queue.queueTask(task)
    queue.queueTask(highPriorityTask)
    const highestPriorityTask = queue.getHighestPriorityTask()
    expect(highestPriorityTask).toBe(highPriorityTask)
  })

  it(
    'puts new tasks behind the existing tasks in the queue that ' +
    'have the same priority',
    () => {
      const queue = new Queue()
      const task = new Task('…', { priority: 50 })
      const samePriorityTask = new Task('…', { priority: 50 })
      queue.queueTask(task)
      queue.queueTask(samePriorityTask)
      expect(queue.getTask(0)).toBe(task)
      expect(queue.getTask(1)).toBe(samePriorityTask)
    },
  )
})

describe('task priority assignment', () => {
  it('looks up priority in priority lookup', () => {
    const priorityLookup = new Map([
      ['God', 1],
    ])
  })
})
