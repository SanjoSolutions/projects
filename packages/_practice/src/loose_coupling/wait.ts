export function wait(timespan: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timespan))
}
