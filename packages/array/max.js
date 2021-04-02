import { isBigger } from "@sanjo/comparison"
import identity from "@sanjo/identity"
import { getExtrema } from "./getExtrema.js"

export function max(array, getter = identity): any {
  return getExtrema(array, getter, isBigger)
}
