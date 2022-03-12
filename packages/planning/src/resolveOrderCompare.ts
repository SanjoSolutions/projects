import type { Task } from './Task.js'

export function resolveOrderCompare(a: Task, b: Task): number {
  return b.dependsOnCompletionOf(a) ? -1 : a.dependsOnCompletionOf(b) ? 1 : 0
}
