import { isStrictSubset } from './isStrictSubset.js';
describe('isStrictSubset', () => {
    test('{ 1 } is a strict subset of { 1, 2 }', () => {
        const a = new Set([1]);
        const b = new Set([1, 2]);
        expect(isStrictSubset(a, b)).toEqual(true);
    });
});
//# sourceMappingURL=isStrictSubset.spec.js.map