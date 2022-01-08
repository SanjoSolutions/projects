import { sortCardsDescending } from './sortCardsDescending.js'
import { getRank } from './getRank.js'
import { getRankValue } from './getRankValue.js'

export function sortStraightFlushesDescending(straightFlushes) {
  straightFlushes = [...straightFlushes]
  straightFlushes.sort((a, b) => {
    const aValue = getHighestRankValue(a)
    const bValue = getHighestRankValue(b)
    return bValue - aValue
  })
  return straightFlushes
}

function getHighestRankValue(cards) {
  return getRankValue(getRank(sortCardsDescending(cards)[0]))
}
