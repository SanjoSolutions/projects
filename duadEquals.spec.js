import { describe, it } from '@jest/globals'
import { duadEquals } from './duadEquals.js'

describe('duadEquals', () => {
  it('returns true when both values equal', () => {
    const a = 1
    const b = 1
    expect(duadEquals([a, b])).toEqual(true)
  })

  it('returns false when both values not equal', () => {
    const a = 1
    const b = 2
    expect(duadEquals([a, b])).toEqual(false)
  })
})
