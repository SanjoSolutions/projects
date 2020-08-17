import { isBigger } from '@sanjo/comparison';
import identity from '@sanjo/identity';
import { getExtrema } from "./getExtrema";

export function max (array, getter = identity) {
  return getExtrema(array, getter, isBigger);
}
