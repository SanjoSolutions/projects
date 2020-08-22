import { interpolatePointsOnLine } from './interpolatePointsOnLine.js'

test('', () => {
  expect(
    interpolatePointsOnLine({x: 0, y: 0}, {x: 2, y: 0})
  ).toEqual(
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
  )
})

test('', () => {
  expect(
    interpolatePointsOnLine({x: 0, y: 0}, {x: 0, y: 2})
  ).toEqual(
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}]
  )
})

test('', () => {
  expect(
    interpolatePointsOnLine({x: 0, y: 0}, {x: 2, y: 2})
  ).toEqual(
    [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]
  )
})

test('', () => {
  expect(
    interpolatePointsOnLine({x: 2, y: 2}, {x: 0, y: 0})
  ).toEqual(
    [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]
  )
})

test('', () => {
  expect(
    interpolatePointsOnLine({x: 0, y: 0}, {x: 0, y: 0})
  ).toEqual(
    [{x: 0, y: 0}]
  )
})
