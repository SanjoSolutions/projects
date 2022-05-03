export function reduce<T, AggregateType>(
  set: Set<T>,
  reducer: (aggregate: AggregateType, element: T) => AggregateType,
  initialValue?: AggregateType
): AggregateType {
  if (typeof initialValue === "undefined") {
    // @ts-ignore
    return Array.from(set).reduce(reducer);
  } else {
    return Array.from(set).reduce(reducer, initialValue);
  }
}
