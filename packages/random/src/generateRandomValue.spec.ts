import { generateRandomValue } from './generateRandomValue.js'

describe('generateRandomValue', () => {
  it('returns a random value', () => {
    const value = 0
    const randomValue = generateRandomValue([value])
    expect(randomValue).toEqual(value)
  })
})
