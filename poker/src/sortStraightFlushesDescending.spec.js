import { sortStraightFlushesDescending } from './sortStraightFlushesDescending.js'

describe('sortStraightFlushesDescending', () => {
  it('sorts straight flushes in descending order', () => {
    const straightFlushes = new Set([new Set(['2s', '3s', '4s', '5s', '6s']), new Set(['3s', '4s', '5s', '6s', '7s'])])

    expect(sortStraightFlushesDescending(straightFlushes)).toEqual([
      new Set(['3s', '4s', '5s', '6s', '7s']),
      new Set(['2s', '3s', '4s', '5s', '6s']),
    ])
  })
})
