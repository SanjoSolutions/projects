import { last } from '@sanjo/array'

export class Cache<T> {
  private _cache = new Map()

  has(key: any): boolean {
    const keyArray = this._convertKeyToArray(key)
    let a = this._cache
    for (const keyArrayElement of keyArray.slice(0, keyArray.length - 1)) {
      if (a.has(keyArrayElement)) {
        a = a.get(keyArrayElement)
      } else {
        return false
      }
    }
    return a.has(last(keyArray))
  }

  get(key: any): T | null {
    const keyArray = this._convertKeyToArray(key)
    let a: any = this._cache
    for (const keyArrayElement of keyArray) {
      if (a.has(keyArrayElement)) {
        a = a.get(keyArrayElement)
      } else {
        return null
      }
    }
    return a as T
  }

  set(key: any, value: T): void {
    const keyArray = this._convertKeyToArray(key)
    let a = this._cache
    for (const keyArrayElement of keyArray.slice(0, keyArray.length - 1)) {
      let b
      if (a.has(keyArrayElement)) {
        b = a.get(keyArrayElement)
      } else {
        b = new Map<number, number[][]>()
        a.set(keyArrayElement, b)
      }
      a = b
    }

    a.set(last(keyArray), value)
  }

  clear(): void {
    this._cache = new Map()
  }

  _convertKeyToArray(key: any): any[] {
    return this._convertKeyObjectToArray(key)
  }

  _convertKeyObjectToArray(key: any): any[] {
    const propertyNames = Object.keys(key)
    propertyNames.sort()
    return propertyNames.map(propertyName => key[propertyName])
  }
}
