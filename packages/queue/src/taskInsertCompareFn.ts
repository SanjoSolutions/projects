import type { Task } from './Task.js'

export function taskInsertCompareFn(value: Task, valueAtIndex: Task) {
  const valuePriority = value.priority
  const valueAtIndexPriority = valueAtIndex.priority
  return valuePriority <= valueAtIndexPriority ? valuePriority - valueAtIndexPriority : 0
}
