import { isBigger } from '@sanjo/comparison'
import identity from '@sanjo/identity'
import { getExtrema } from './getExtrema'

export function max (
  array: any[],
  getter: (value: any) => any = identity,
): any {
  return getExtrema(array, getter, isBigger)
}
