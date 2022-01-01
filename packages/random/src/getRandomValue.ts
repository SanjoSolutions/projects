import { getRandomInteger } from './getRandomInteger.js'

export function getRandomValue(values: any[]) {
  return values[getRandomInteger(0, values.length)]
}
