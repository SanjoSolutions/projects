export function series(minInclusive, maxInclusive) {
  const result = [];
  for (let value = minInclusive; value <= maxInclusive; value += 1) {
    result.push(value);
  }
  return result;
}
