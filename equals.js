export function equals(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return arrayEquals(a, b)
  } else if (typeof a === 'object' && typeof b === 'object') {
    return objectEquals(a, b)
  } else {
    return a === b
  }
}

function arrayEquals(a, b) {
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

function objectEquals(a, b) {
  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]))
  return keys.every(key => a[key] === b[key])
}
