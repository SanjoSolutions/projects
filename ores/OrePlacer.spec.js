import { describe, test, expect } from '@jest/globals'
import { OrePlacer, OresMap } from './index.js'

describe('OrePlacer', () => {
  test('fieldsWithDistanceToPoint 1', () => {
    const map = new OresMap(3, 3)
    const orePlacer = new OrePlacer(map)
    const fields = orePlacer.fieldsWithDistanceToPoint({ x: 1, y: 1 }, 1)
    const expectedFields = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ]
    expect(fields).toEqual(expectedFields)
  })

  test('fieldsWithDistanceToPoint 2', () => {
    const map = new OresMap(1, 1)
    const orePlacer = new OrePlacer(map)
    const fields = orePlacer.fieldsWithDistanceToPoint({ x: 0, y: 0 }, 1)
    const expectedFields = []
    expect(fields).toEqual(expectedFields)
  })
})
