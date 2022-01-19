import { isSmaller } from '@sanjo/comparison'
import { identity } from '@sanjo/identity'
import { getExtrema } from './getExtrema.js'

export function min<T>(array: T[], getter: (value: T) => any = identity) {
  return getExtrema(array, getter, isSmaller)
}
