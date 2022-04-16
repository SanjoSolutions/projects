import { describe, expect, it, test } from '@jest/globals';
import { difference } from './difference.js';
describe('difference', () => {
    test('difference', () => {
        const a = new Set([1, 2]);
        const b = new Set([2]);
        const c = difference(a, b);
        expect(c).toEqual(new Set([1]));
    });
    it('support more than 2 arguments', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([2]);
        const c = new Set([3]);
        const result = difference(a, b, c);
        expect(result).toEqual(new Set([1]));
    });
});
//# sourceMappingURL=difference.spec.js.map