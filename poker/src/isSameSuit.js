import { getSuit } from './getSuit.js'

export function isSameSuit (cards) {
  cards = [...cards]
  const suit = getSuit(cards[0])
  return cards.every(card => getSuit(card) === suit)
}
