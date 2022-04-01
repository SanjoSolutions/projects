import { randomInteger } from './randomInteger.js'

export function shuffle(values) {
  const shuffledValues = []
  for (const value of values) {
    const index = randomInteger(0, shuffledValues.length)
    shuffledValues.splice(index, 0, value)
  }
  return shuffledValues
}
