import { sum } from "./packages/mathematics/arithmetic/sum.js"

export function selectRandom(optionProbabilities) {
  if (sum(optionProbabilities.values()) !== 1) {
    throw new Error("Probabilities of options need to sum to 1")
  }
  const random = Math.random()
  let accumulatedProbability = 0
  for (const [option, probability] of optionProbabilities) {
    accumulatedProbability += probability
    if (random < accumulatedProbability) {
      return option
    }
  }
}
