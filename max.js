export function max(values) {
  let maximum = values[0]
  for (let index = 1; index <= values.length; index++) {
    const value = values[index]
    if (value > maximum) {
      maximum = value
    }
  }
  return maximum
}
