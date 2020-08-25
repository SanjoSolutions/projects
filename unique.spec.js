import { expect, specification } from './packages/specification/index.js'
import { unique } from './unique.js'

specification(() => {
  expect(unique([1, 2, 1])).toEqual([1, 2])
})

specification(() => {
  expect(
    unique([[0, 0], [1, 1], [0, 0]]),
  ).toEqual([[0, 0], [1, 1]])
})
