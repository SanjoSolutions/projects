import { ensureEntryInMap } from "@sanjo/ensure-entry-in-map"

export function groupByToMap<T, GroupingType>(
  array: T[],
  predicate: (element: T) => GroupingType,
): Map<GroupingType, T[]> {
  const groups = new Map<GroupingType, T[]>()
  const createDefaultValue = (): T[] => []
  for (const element of array) {
    const groupValue = predicate(element)
    ensureEntryInMap(groups, groupValue, createDefaultValue)
    const group = groups.get(groupValue)!
    group.push(element)
  }
  return groups
}
