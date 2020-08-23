import { specification, expect } from '../index.js'

specification(async function () {
  await wait(1)
  expect(true).toEqual(true)
})

function wait (howLongInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, howLongInMs)
  })
}
