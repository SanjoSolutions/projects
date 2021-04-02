export function zip(a, b) {
  const length = Math.max(a.length, b.length);
  const zipped = new Array(length);
  for (let index = 0; index < length; index++) {
    zipped[index] = [a[index], b[index]];
  }
  return zipped;
}
