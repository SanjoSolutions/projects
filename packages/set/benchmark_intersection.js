import { intersection, intersection2 } from './set.js';
import { performance } from 'perf_hooks';
export function range(from, to) {
    const length = to - from + 1;
    const result = new Array(length);
    let index = 0;
    for (let i = from; i <= to; i++) {
        result[index] = i;
        index++;
    }
    return result;
}
const candidates = [intersection, intersection2];
const durations = [];
const results = [];
for (const candidate of candidates) {
    const a = new Set(range(1, 1000));
    const b = new Set(range(500, 1500));
    const start = performance.now();
    const c = candidate(a, b);
    results.push(c);
    const end = performance.now();
    const duration = end - start;
    durations.push(duration);
}
console.log(results);
console.log('Durations:');
for (let index = 0; index < candidates.length; index++) {
    const candidate = candidates[index];
    const duration = durations[index];
    console.log(`${candidate.name}: ${duration / 1000}s`);
}
function minIndex(array) {
    let minIndex = null;
    let minValue = null;
    for (let index = 0; index < array.length; index++) {
        const value = array[index];
        if (minValue === null || value < minValue) {
            minIndex = index;
            minValue = value;
        }
    }
    return minIndex;
}
const fastestCandidate = candidates[minIndex(durations)];
console.log(`Fastest candidate: ${fastestCandidate.name}`);
//# sourceMappingURL=benchmark_intersection.js.map