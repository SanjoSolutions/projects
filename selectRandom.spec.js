import { expect, specification } from './packages/specification/index.js'
import { selectRandom } from './selectRandom.js'

specification(() => {
  const optionProbabilities = new Map([
    [1, 0.4],
    [2, 0.3],
    [3, 0.3],
  ])
  const option = selectRandom(optionProbabilities)
  expect([1, 2, 3].includes(option)).toEqual(true)
})
