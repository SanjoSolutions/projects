import { getRandomInteger } from './getRandomInteger.js'

describe('getRandomInteger', () => {
  it('returns a random integer', () => {
    const randomInteger = getRandomInteger(0, 1)
    expect(randomInteger).toEqual(0)
  })
})
