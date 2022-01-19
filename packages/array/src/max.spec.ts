import { max } from './max.js'

describe('max', () => {
  it('returns the maximum', () => {
    expect(max([2, 3, 1])).toEqual(3)
    expect(max([{ a: 2 }, { a: 3 }, { a: 1 }], object => object.a)).toEqual({
      a: 3,
    })
    expect(max([])).toEqual(null)
  })
})
