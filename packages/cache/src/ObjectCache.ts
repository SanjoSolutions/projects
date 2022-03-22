import { Cache, FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE } from './Cache'

export class ObjectCache<T> {
  private _cache = new Cache<T>()

  has(key: any): boolean {
    const keyArray = this._convertKeyToArray(key)
    return this._cache.has(keyArray)
  }

  get(key: any): T | null {
    const keyArray = this._convertKeyToArray(key)
    try {
      return this._cache.retrieve(keyArray)
    } catch (error: any) {
      if (error.message === FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE) {
        return null
      } else {
        throw error
      }
    }
  }

  set(key: any, value: T): void {
    const keyArray = this._convertKeyToArray(key)
    this._cache.set(keyArray, value)
  }

  clear(): void {
    this._cache.clear()
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
