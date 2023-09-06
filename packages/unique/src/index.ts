import { equals } from "@sanjo/equals"

export function unique<T>(values: T[]): T[] {
  const uniqueValues: T[] = []
  for (const value of values) {
    if (!uniqueValues.some((v) => equals(value, v))) {
      uniqueValues.push(value)
    }
  }
  return uniqueValues
}
