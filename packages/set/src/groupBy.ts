import { groupByToMap } from "./groupByToMap.js"

export function groupBy<T, GroupingType>(
  set: Set<T>,
  predicate: (element: T) => GroupingType,
): Set<Set<T>> {
  return new Set(groupByToMap(set, predicate).values())
}
