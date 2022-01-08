export function randomInteger(minInclusive, maxInclusive) {
  minInclusive = Math.floor(minInclusive)
  maxInclusive = Math.floor(maxInclusive)
  return minInclusive + Math.floor(Math.random() * (maxInclusive - minInclusive + 1))
}
