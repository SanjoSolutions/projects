import { expect, specification } from '../packages/specification/index.js'
import { detectCorner } from './detectCorner.js'

specification(() => {
  console.log('case 1')
  expect(
    detectCorner([[1, 0], [0, 0], [0, 1]]),
  ).toEqual(true)
})

specification(() => {
  console.log('case 2')
  expect(
    detectCorner([[1, 0], [1, 1], [0, 1]]),
  ).toEqual(true)
})

specification(() => {
  console.log('case 3')
  expect(
    detectCorner([[0, 0], [1, 1], [2, 0]]),
  ).toEqual(true)
})

specification(() => {
  console.log('case 4')
  expect(
    detectCorner([[0, 0], [1, 0], [2, 0]]),
  ).toEqual(false)
})

specification(() => {
  console.log('case 5')
  expect(
    detectCorner([[0, 0], [10, 1], [17, 2]]),
  ).toEqual(false)
})

specification(() => {
  console.log('case 6')
  expect(
    detectCorner([[8, 0], [0, 1], [1, 2]]),
  ).toEqual(true)
})

specification(() => {
  console.log('case 7')
  expect(
    detectCorner([[1, 0], [1, 1], [0, 1]]),
  ).toEqual(true)
})
