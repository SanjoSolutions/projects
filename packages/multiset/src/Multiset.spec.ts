import { describe, it, expect } from '@jest/globals'
import { Multiset } from './Multiset.js'

describe('Multiset', () => {
  it('supports adding multiple of the same element', () => {
    const multiset = new Multiset()
    multiset.add(1)
    multiset.add(1)
    multiset.remove(1)
    expect(multiset.has(1)).toEqual(true)
    multiset.remove(1)
    expect(multiset.has(1)).toEqual(false)
  })

  describe('count', () => {
    it('returns the count of an element', () => {
      const multiset = new Multiset()
      multiset.add(1)
      multiset.add(1)
      expect(multiset.count(1)).toEqual(2)
    })
  })
})
