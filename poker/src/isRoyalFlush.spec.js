import { isRoyalFlush } from './isRoyalFlush.js'

describe('isRoyalFlush', () => {
  it('returns true for a royal flush', () => {
    const royalFlush = ['Ah', 'Kh', 'Qh', 'Jh', 'Th']
    expect(isRoyalFlush(royalFlush)).toEqual(true)
  })

  it('returns false for cards that not make a royal flush', () => {
    const royalFlush = ['Ah', 'Kh', 'Qh', 'Jh', '9h']
    expect(isRoyalFlush(royalFlush)).toEqual(false)
  })
})
