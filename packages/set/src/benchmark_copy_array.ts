import { copyArray1, copyArray2 } from './set.js'
import { performance } from 'perf_hooks'

export function range(from: number, to: number): number[] {
  const length = to - from + 1
  const result = new Array(length)
  let index = 0
  for (let i = from; i <= to; i++) {
    result[index] = i
    index++
  }
  return result
}

const candidates = [copyArray1, copyArray2]
const durations: number[] = []
const results = []

for (const candidate of candidates) {
  const a = range(1, 1000)
  const start = performance.now()
  const b = candidate(a)
  results.push(b)
  const end = performance.now()
  const duration = end - start
  durations.push(duration)
}

console.log(results)

console.log('Durations:')
for (let index = 0; index < candidates.length; index++) {
  const candidate = candidates[index]
  const duration = durations[index]
  console.log(`${candidate.name}: ${duration / 1000}s`)
}

function minIndex(array: number[]): number | null {
  let minIndex = null
  let minValue = null
  for (let index = 0; index < array.length; index++) {
    const value = array[index]
    if (minValue === null || value < minValue) {
      minIndex = index
      minValue = value
    }
  }
  return minIndex
}

const fastestCandidate = candidates[minIndex(durations)!]
console.log(`Fastest candidate: ${fastestCandidate.name}`)
