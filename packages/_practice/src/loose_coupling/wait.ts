export function wait (timespan) {
  return new Promise(resolve => setTimeout(resolve, timespan))
}
