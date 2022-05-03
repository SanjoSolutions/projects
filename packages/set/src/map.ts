export function map<FromType, ToType>(
  set: Set<FromType>,
  predicate: (element: FromType) => ToType
): Set<ToType> {
  return new Set(Array.from(set).map(predicate));
}
