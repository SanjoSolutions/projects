import { specification, expect } from '../index.js'

specification(function () {
  expect(function () {
    throw Error('<error message>')
  }).toThrowError('<error message>')
})
