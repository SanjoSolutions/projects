import { sum } from "@sanjo/mathematics"

export function selectRandom<T>(optionProbabilities: Map<T, number>): T {
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

  // This is for TypeScript
  const values = Array.from(optionProbabilities.keys())
  return values[values.length - 1]
}
