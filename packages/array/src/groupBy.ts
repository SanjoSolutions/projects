import { groupByToMap } from "./groupByToMap.js";

export function groupBy<T, GroupingType>(
  array: T[],
  predicate: (element: T) => GroupingType
): { [key: string]: T } {
  return Object.fromEntries(groupByToMap(array, predicate).entries());
}
