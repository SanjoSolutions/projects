import { last } from "@sanjo/array"

export const FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE =
  "Failed to retrieve value."

export class Cache<T = any> {
  _cache: Map<any, any>

  constructor() {
    this._cache = new Map()
  }

  has(key: any): boolean {
    return Boolean(this._retrieveValue(key, () => false))
  }

  retrieve(key: any): T {
    return this._retrieveValue(key, () => {
      throw new Error(FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE)
    })
  }

  set(key: any, value: T): void {
    key = this._convertKeyToArray(key)
    let object = this._cache
    for (const keyPart of key.slice(0, key.length - 1)) {
      if (object instanceof Map && object.has(keyPart)) {
        object = object.get(keyPart)
      } else {
        const newObject = new Map()
        object.set(keyPart, newObject)
        object = newObject
      }
    }
    object.set(last(key), value)
  }

  clear(): void {
    this._cache = new Map()
  }

  _convertKeyToArray(key: any): any[] {
    let result
    if (Array.isArray(key)) {
      result = key
    } else {
      result = [key]
    }
    return result
  }

  _retrieveValue(key: any, onMiss: () => any): any {
    key = this._convertKeyToArray(key)
    let object = this._cache
    for (const keyPart of key) {
      if (object instanceof Map && object.has(keyPart)) {
        object = object.get(keyPart)
      } else {
        return onMiss()
      }
    }
    return object
  }
}
