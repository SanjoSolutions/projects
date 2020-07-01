const suitToSuitValue = new Map([
  ['h', 0],
  ['c', 1],
  ['s', 2],
  ['d', 3]
])

export function getSuitValue (suit) {
  return suitToSuitValue.get(suit)
}
