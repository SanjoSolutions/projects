import { expect, specification } from '../packages/specification/index.js'
import { detectCorners } from './detectCorners.js'

specification(() => {
  expect(detectCorners([
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ])).toEqual([
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ])
})
