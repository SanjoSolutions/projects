import { describe, expect, it } from '@jest/globals';
import { nOutOfWithDuplicates } from './nOutOfWithDuplicates.js';
describe('nOutOfWithDuplicates', () => {
    it('returns a set of sets, every one with n elements out of a set (1)', () => {
        expect(nOutOfWithDuplicates(2, new Set([1, 2]))).toEqual(new Set([
            new Set([1, 1]),
            new Set([1, 2]),
            new Set([2, 2])
        ]));
    });
});
//# sourceMappingURL=nOutOfWithDuplicates.spec.js.map