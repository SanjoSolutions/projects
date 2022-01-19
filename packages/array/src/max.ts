import { isBigger } from '@sanjo/comparison'
import { identity } from '@sanjo/identity'
import { getExtrema } from './getExtrema.js'

export function max<T>(array: T[], getter: (value: T) => any = identity): T | null {
  return getExtrema(array, getter, isBigger)
}
