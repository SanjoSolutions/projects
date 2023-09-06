import { flat } from "./flat.js"
import { map } from "./map.js"

export function flatMap<FromType, ToType>(
  set: Set<FromType>,
  predicate: (element: FromType) => ToType,
): Set<ToType> {
  return flat(map(set, predicate))
}
