import { plus } from '@sanjo/arithmetic'

export function sum(array: number[]): number
export function sum(array: BigInt[]): BigInt
export function sum(array: any[]): any {
  return array.reduce(plus)
}
