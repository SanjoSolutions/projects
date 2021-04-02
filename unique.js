import { equals } from "./equals.js"

export function unique(values) {
  const uniqueValues = []
  for (const value of values) {
    if (!uniqueValues.some((v) => equals(value, v))) {
      uniqueValues.push(value)
    }
  }
  return uniqueValues
}
