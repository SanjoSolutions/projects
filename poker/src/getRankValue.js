const rankToRankValue = new Map([
  ["2", 0],
  ["3", 1],
  ["4", 2],
  ["5", 3],
  ["6", 4],
  ["7", 5],
  ["8", 6],
  ["9", 7],
  ["T", 8],
  ["J", 9],
  ["Q", 10],
  ["K", 11],
  ["A", 12],
])

export function getRankValue(rank) {
  return rankToRankValue.get(rank)
}
