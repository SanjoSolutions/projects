export function putOut(values, indexes) {
  const pickedValues = pick(values, indexes)
  values = pickOthers(values, indexes)
  return [pickedValues, values]
}
export function pick(values, indexes) {
  indexes = new Set(indexes)
  return values.filter((value, index) => indexes.has(index))
}
export function pickOthers(values, indexes) {
  indexes = new Set(indexes)
  return values.filter((value, index) => !indexes.has(index))
}
export function putIn(values, items) {
  values.push(...items)
}
//# sourceMappingURL=array.js.map
