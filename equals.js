import { zip } from './zip.js'

export function equals (a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return arrayEquals(a, b)
  } else if (typeof a === 'object' && typeof b === 'object') {
    return objectEquals(a, b)
  } else {
    return a === b
  }
}

function arrayEquals (a, b) {
  return zip(a, b).every(([a, b]) => equals(a, b))
}

function objectEquals (a, b) {
  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]))
  return keys.every(key => a[key] === b[key])
}
