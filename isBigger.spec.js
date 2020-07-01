import { isBigger } from './isBigger.js'

describe('isBigger', () => {
  it('returns true when first value bigger than second', () => {
    expect(isBigger(2, 1)).toEqual(true)
  })

  it('returns false when first value smaller than second', () => {
    expect(isBigger(1, 2)).toEqual(false)
  })

  it('returns false when first value equal to second value', () => {
    expect(isBigger(1, 1)).toEqual(false)
  })
})
