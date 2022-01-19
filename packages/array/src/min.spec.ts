import { min } from './min.js'

describe('min', () => {
  it('returns the minimum', () => {
    expect(min([2, 3, 1])).toEqual(1)
    expect(min([{ a: 2 }, { a: 3 }, { a: 1 }], object => object.a)).toEqual({
      a: 1,
    })
    expect(min([])).toEqual(null)
  })
})
