export function groupByToMap<T, GroupingType>(
  set: Set<T>,
  predicate: (element: T) => GroupingType
): Map<GroupingType, Set<T>> {
  const groups = new Map<GroupingType, Set<T>>();
  const createDefaultValue = () => new Set<T>();
  for (const element of set) {
    const groupValue = predicate(element);
    ensureEntryInMap(groups, groupValue, createDefaultValue);
    const group = groups.get(groupValue)!;
    group.add(element);
  }
  return groups;
}

function ensureEntryInMap<Key, Value>(
  map: Map<Key, Value>,
  key: Key,
  createDefaultValue: () => Value
): void {
  if (!map.has(key)) {
    map.set(key, createDefaultValue());
  }
}
