import { generateRandomInteger } from './generateRandomInteger.js'

export function generateRandomValue(values: any[]) {
  return values[generateRandomInteger(0, values.length)]
}
