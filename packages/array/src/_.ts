import { ExtendedArray } from './ExtendedArray'

export function _(array: any[]) {
  return new ExtendedArray(...array)
}
