import { getFiveBestCards } from './getFiveBestCards.js'

describe('getFiveBestCards', () => {
  it('', () => {
    const cards = ['5s', '6s', '7s', '8s', '9s', 'As', 'Ks']
    const fiveBestCards = getFiveBestCards(cards)
    expect(fiveBestCards).toEqual(new Set(['5s', '6s', '7s', '8s', '9s']))
  })

  it('', () => {
    const cards = ['As', 'Ks', '5s', '6s', '7s', '8s', '9s']
    const fiveBestCards = getFiveBestCards(cards)
    expect(fiveBestCards).toEqual(new Set(['5s', '6s', '7s', '8s', '9s']))
  })
})
