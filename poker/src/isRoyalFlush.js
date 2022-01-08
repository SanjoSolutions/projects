import { sortCardsDescending } from './sortCardsDescending.js'
import { getRank } from './getRank.js'
import { isSameSuit } from './isSameSuit.js'

export function isRoyalFlush(cards) {
  cards = sortCardsDescending([...cards].slice(0, 5))
  return (
    isSameSuit(cards) &&
    getRank(cards[0]) === 'A' &&
    getRank(cards[1]) === 'K' &&
    getRank(cards[2]) === 'Q' &&
    getRank(cards[3]) === 'J' &&
    getRank(cards[4]) === 'T'
  )
}
