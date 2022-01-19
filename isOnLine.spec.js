import { describe, test, expect } from '@jest/globals'
import { isOnLine } from './isOnLine.js'

describe('isOnLine', () => {
  test('is on line', () => {
    const a = { x: 0, y: 0 }
    const b = { x: 10, y: 10 }
    const p = { x: 2, y: 2 }
    expect(isOnLine(a, b, p)).toEqual(true)
  })

  test('is on line with epsilon', () => {
    const a = { x: 0, y: 0 }
    const b = { x: 10, y: 10 }
    const p = { x: 2, y: 4 }
    expect(isOnLine(a, b, p)).toEqual(true)
  })
})
