export function equals<T>(a: T, b: T): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return arrayEquals(a, b)
  } else if (
    typeof a === "object" &&
    a !== null &&
    typeof b === "object" &&
    b !== null
  ) {
    return objectEquals(a, b)
  } else {
    return a === b
  }
}

function arrayEquals<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  const length = a.length
  for (let index = 0; index < length; index++) {
    if (!equals(a[index], b[index])) {
      return false
    }
  }

  return true
}

function objectEquals(a: Record<string, any>, b: Record<string, any>): boolean {
  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]))
  return keys.every((key) => a[key] === b[key])
}
