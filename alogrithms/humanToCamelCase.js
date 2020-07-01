import { capitalizeFirstLetter } from './capitalizeFirstLetter.js'

export function humanToCamelCase (string) {
  const words = string.split(' ')
  return words[0] + words.slice(1).map(capitalizeFirstLetter)
}
