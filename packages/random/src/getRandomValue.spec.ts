import { getRandomValue } from './getRandomValue.js'

describe('getRandomValue', () => {
  it('returns a random value', () => {
    const value = 0
    const randomValue = getRandomValue([value])
    expect(randomValue).toEqual(value)
  })
})
