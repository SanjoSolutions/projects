import { specification, expect } from "../index.js"

specification(function () {
  class A {}
  expect(A).toExist()
})
