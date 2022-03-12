import binarySearch from '@sanjo/binary-search'
import type { Task } from './Task.js'
import { taskInsertCompareFn } from './taskInsertCompareFn.js'

export class PriorityQueue {
  #tasks: Task[]

  constructor() {
    this.#tasks = []
  }

  queueTask(task: Task) {
    const { index } = binarySearch<Task>(this.#tasks, taskInsertCompareFn, task)
    this.#tasks.splice(index + 1, 0, task)
  }

  getTask(index: number): Task | null {
    return this.#tasks[index] || null
  }

  getHighestPriorityTask(): Task | null {
    return this.#tasks[0] || null
  }
}
