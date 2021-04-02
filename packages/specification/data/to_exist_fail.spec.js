import { specification, expect } from "../index.js"

specification(function () {
  const A = undefined
  expect(A).toExist()
})
