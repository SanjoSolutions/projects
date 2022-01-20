export function* range(from: number, to: number, interval: number = 1) {
  for (let i = from; i <= to; i += interval) {
    yield i
  }
}
