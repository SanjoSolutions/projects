import { describe, it, expect } from '@jest/globals';
import { unique } from './unique.js';
describe('unique', () => {
    it('returns an array with unique value', () => {
        expect(unique([1, 2, 2])).toEqual([1, 2]);
    });
    it('works with mixes types', () => {
        expect(unique([1, 1, 'a', 'a'])).toEqual([1, 'a']);
    });
});
//# sourceMappingURL=unique.spec.js.map