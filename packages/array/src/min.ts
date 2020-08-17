import { isSmaller } from '@sanjo/comparison';
import identity from '@sanjo/identity';
import { getExtrema } from "./getExtrema";

export function min (array, getter = identity) {
  return getExtrema(array, getter, isSmaller);
}
