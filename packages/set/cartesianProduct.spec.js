import { describe, it, expect } from '@jest/globals';
import { cartesianProduct } from './cartesianProduct.js';
describe('cartesianProduct', () => {
    it('returns the cartesian product', () => {
        const a = new Set([1, 2]);
        const b = new Set(['a', 'b']);
        const result = cartesianProduct(a, b);
        expect(result).toEqual(new Set([
            [1, 'a'],
            [1, 'b'],
            [2, 'a'],
            [2, 'b'],
        ]));
    });
});
//# sourceMappingURL=cartesianProduct.spec.js.map