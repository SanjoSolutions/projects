import { getRandomFloat } from './getRandomFloat.js'

describe('getRandomFloat', () => {
  it('the returned number is exclusive of the max', () => {
    const max = 1
    jest.spyOn(Math, 'random').mockReturnValue(0.99)
    const randomFloat = getRandomFloat(0, max)
    expect(randomFloat).toBeLessThan(max)
  })
})
