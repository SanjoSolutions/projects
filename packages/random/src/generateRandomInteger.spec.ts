import { generateRandomInteger } from './generateRandomInteger.js'

describe('generateRandomInteger', () => {
  it('returns a random integer', () => {
    const randomInteger = generateRandomInteger(0, 1)
    expect(randomInteger).toEqual(0)
  })
})
