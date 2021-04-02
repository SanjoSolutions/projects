import { specification, expect } from "../index.js"

specification(async function () {
  await wait(1)
  throw Error("<error message>")
})

function wait(howLongInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, howLongInMs)
  })
}
