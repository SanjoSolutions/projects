import type { KeyPath } from "./KeyPath.js"
import type { ObjectDiff } from "./objectDiff.js"
import type { ObjectOperation } from "./ObjectOperation.js"

export function applyDiff(object: any, diff: ObjectDiff) {
  return diff.reduce(applyOperation, object)
}

function applyOperation(object: any, operation: ObjectOperation) {
  const { type } = operation
  switch (type) {
    case "add":
      applyOperationAdd(object, operation)
      break
    case "update":
      applyOperationUpdate(object, operation)
      break
    case "remove":
      applyOperationRemove(object, operation)
      break
    default:
      throw new Error(`Unknown operation of type "${type}".`)
  }
  return object
}

function applyOperationAdd(object: any, operation: ObjectOperation) {
  const { key, value } = operation
  setValue(object, key, value)
}

function applyOperationUpdate(object: any, operation: ObjectOperation) {
  const { key, value } = operation
  setValue(object, key, value)
}

function applyOperationRemove(object: any, operation: ObjectOperation) {
  const { key } = operation
  removeProperty(object, key)
}

function getValue(object: any, keyPath: KeyPath): any {
  let result = object
  for (let index = 0; index < keyPath.length; index++) {
    const key = keyPath[index]
    if (!result.hasOwnProperty(key)) {
      const subKeyPathString = keyPathToString(keyPath.slice(0, index + 1))
      throw new Error(`Missing property with path: ${subKeyPathString}`)
    }
    result = result[key]
  }
  return result
}

function setValue(object: any, keyPath: KeyPath, value: any) {
  let result = object
  for (let index = 0; index < keyPath.length - 1; index++) {
    const key = keyPath[index]
    if (!result.hasOwnProperty(key)) {
      const subKeyPathString = keyPathToString(keyPath.slice(0, index + 1))
      throw new Error(`Missing property with path: ${subKeyPathString}`)
    }
    result = result[key]
  }
  const lastKey = keyPath[keyPath.length - 1]
  result[lastKey] = value
}

function removeProperty(object: any, keyPath: KeyPath) {
  let result = object
  for (let index = 0; index < keyPath.length - 1; index++) {
    const key = keyPath[index]
    if (!result.hasOwnProperty(key)) {
      return
    }
    result = result[key]
  }
  const lastKey = keyPath[keyPath.length - 1]
  delete result[lastKey]
}

function keyPathToString(keyPath: KeyPath): string {
  return `.${keyPath.join(".")}`
}
