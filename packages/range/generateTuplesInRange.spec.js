import { describe, expect, it } from '@jest/globals';
import { generateTuplesInRange } from './generateTuplesInRange.js';
describe('generateTuplesInRange', () => {
    it('generates tuples in a range', () => {
        expect(generateTuplesInRange([
            [0, 3, 1],
            [0, 3, 1],
        ])).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 0],
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3],
        ]);
    });
    it('supports different intervals', () => {
        expect(generateTuplesInRange([
            [0, 1, 1],
            [0, 2, 2],
        ])).toEqual([
            [0, 0],
            [0, 2],
            [1, 0],
            [1, 2],
        ]);
    });
    it('supports tuples with more than 2 elements', () => {
        expect(generateTuplesInRange([
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
        ])).toEqual([[0, 0, 0]]);
    });
});
//# sourceMappingURL=generateTuplesInRange.spec.js.map