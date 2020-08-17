import { sum } from './sum'

describe('sum', () => {
  it('adds the numbers in an array', () => {
    expect(sum([1, 2, 3])).toEqual(6)
  })
})
