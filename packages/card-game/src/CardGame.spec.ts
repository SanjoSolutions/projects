import { describe, expect, test } from '@jest/globals'
import { CardGame } from './CardGame.js'

describe('CardGame', () => {
  test('construction of CardGame', () => {
    const cardGame = new CardGame()
    expect(cardGame).toBeInstanceOf(CardGame)
  })
})
