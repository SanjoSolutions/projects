import { describe, expect, it } from '@jest/globals';
import { concat } from './concat.js';
describe('concat', () => {
    it('concatenates multiple arrays', () => {
        expect(concat([1, 2], [3], [4, 5])).toEqual([1, 2, 3, 4, 5]);
    });
});
//# sourceMappingURL=concat.spec.js.map