import { generateRandomInteger } from './generateRandomInteger.js'

export function getRandomValue(values: any[]) {
  return values[generateRandomInteger(0, values.length)]
}
