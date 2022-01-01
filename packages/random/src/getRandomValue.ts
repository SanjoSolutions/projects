import { getRandomInteger } from './getRandomInteger.js'

export function getRandomValue(values: []) {
  return values[getRandomInteger(0, values.length)]
}
