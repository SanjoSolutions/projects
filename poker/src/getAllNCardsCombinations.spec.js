import { getAllNCardsCombinations } from './getAllNCardsCombinations.js'

describe('getAllNCardsCombinations', () => {
  it('returns all combinations with 1 card', () => {
    const cards = new Set(['2s'])
    const numberOfCards = 1
    const combinations = getAllNCardsCombinations(cards, numberOfCards)
    expect(combinations).toEqual(new Set([
      new Set(['2s'])
    ]))
  })

  it('returns all combinations with 3 cards', () => {
    const cards = new Set(['2s', '3s', '4s', '5s'])
    const numberOfCards = 3
    const combinations = getAllNCardsCombinations(cards, numberOfCards)
    expect(combinations).toEqual(new Set([
      new Set(['2s', '3s', '4s']),
      new Set(['2s', '3s', '5s']),
      new Set(['2s', '4s', '5s']),
      new Set(['3s', '4s', '5s'])
    ]))
  })
})
