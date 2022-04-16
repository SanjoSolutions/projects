import { Cache } from './Cache.js'

export function createCachingFunction<T extends Function>(fn: T): { (...args: any[]): any; cache: Cache } {
  const cache = new Cache()
  const cachingFunction = function (...args: any[]) {
    let result
    if (cache.has(args)) {
      result = cache.retrieve(args)
    } else {
      result = fn(...args)
      cache.set(args, result)
    }
    return result
  }
  cachingFunction.cache = cache
  return cachingFunction
}
