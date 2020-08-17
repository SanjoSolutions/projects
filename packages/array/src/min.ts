import { isSmaller } from '@sanjo/comparison'
import identity from '@sanjo/identity'
import { getExtrema } from './getExtrema'

export function min<T>(array: T[], getter?: (value: T) => any): T
export function min(array: any, getter: (value: any) => any = identity): any {
  return getExtrema(array, getter, isSmaller)
}
