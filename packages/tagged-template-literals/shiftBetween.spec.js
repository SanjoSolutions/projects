import { describe, it, expect } from '@jest/globals';
import { shiftBetween } from './shiftBetween.js';
describe('shiftBetween', () => {
    it('shifts between values of an array into another', () => {
        const a = ['a', 'b', 'c'];
        const b = [1, 2];
        expect(shiftBetween(a, b)).toEqual(['a', 1, 'b', 2, 'c']);
    });
});
//# sourceMappingURL=shiftBetween.spec.js.map