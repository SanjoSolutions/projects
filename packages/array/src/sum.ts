import { plus } from '@sanjo/arithmetic';

export function sum (array) {
  return array.reduce(plus);
}
