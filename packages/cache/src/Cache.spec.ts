import { describe, it, test, expect, jest, afterEach, beforeEach } from '@jest/globals'
import { Cache, FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE } from './Cache'

describe('Cache', () => {
  describe('has', () => {
    describe('when the cache has a value for the key', () => {
      it('returns true', () => {
        const cache = new Cache()
        const key = 1
        cache.set(key, {})

        expect(cache.has(key)).toEqual(true)
      })
    })

    describe('when the cache has no value for the key', () => {
      it('returns false', () => {
        const cache = new Cache()
        const key = 1

        expect(cache.has(key)).toEqual(false)
      })
    })
  })

  describe('retrieve', () => {
    describe('when the cache has a value for the key', () => {
      it('returns the value', () => {
        const cache = new Cache()
        const key = 1
        const value = {}
        cache.set(key, value)

        expect(cache.retrieve(key)).toBe(value)
      })
    })

    describe('when the cache has no value for the key', () => {
      it('throws the error "Failed to retrieve value."', () => {
        const cache = new Cache()
        const key = 1

        expect(() => cache.retrieve(key)).toThrowError(FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE)
      })
    })
  })
})
