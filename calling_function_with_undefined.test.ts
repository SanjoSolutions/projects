import { test, expect } from '@jest/globals'

test('calling function with undefined', () => {
  function fn(...args: any[]): number {
    return args.length
  }

  expect(fn(undefined)).toEqual(1)
})
