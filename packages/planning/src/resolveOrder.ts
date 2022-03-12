import { resolveOrderCompare } from './resolveOrderCompare.js'
import type { Task } from './Task.js'

export function resolveOrder(tasks: Set<Task>): Task[] {
  const order = Array.from(tasks)
  order.sort(resolveOrderCompare)

  return order
}
