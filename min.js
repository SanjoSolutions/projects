export function min(values) {
  let minimum = values[0]
  for (let index = 0; index <= values.length; index++) {
    const value = values[index]
    if (value < minimum) {
      minimum = value
    }
  }
  return minimum
}
