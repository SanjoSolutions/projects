import { arrayDiff } from './arrayDiff.js'
import { isObject } from './isObject.js'
import { objectDiff } from './objectDiff.js'

export function isEqual(a: any, b: any): boolean {
  return (
    a === b ||
    (isObject(a) && isObject(b) && objectDiff(a, b).length === 0) ||
    (Array.isArray(a) && Array.isArray(b) && arrayDiff(a, b).length === 0)
  )
}
