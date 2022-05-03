export function ensureEntryInMap<Key, Value>(
  map: Map<Key, Value>,
  key: Key,
  createDefaultValue: () => Value
): void {
  if (!map.has(key)) {
    map.set(key, createDefaultValue());
  }
}
