import { getRankValue } from './getRankValue.js'
import { getRank } from './getRank.js'
import { sortCardsDescending } from './sortCardsDescending.js'
import { isSameSuit } from './isSameSuit.js'

export function isStraightFlush(cards) {
  cards = sortCardsDescending([...cards].slice(0, 5))
  if (!isSameSuit(cards)) {
    return false
  }
  for (let index = 0; index < cards.length - 1; index++) {
    if (getRankValue(getRank(cards[index])) - getRankValue(getRank(cards[index + 1])) !== 1) {
      return false
    }
  }

  return true
}
