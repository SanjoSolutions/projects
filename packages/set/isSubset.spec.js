import { isSubset } from './isSubset.js';
describe('isSubset', () => {
    test('{ 1 } is a subset of { 1 }', () => {
        const a = new Set([1]);
        const b = new Set([1]);
        expect(isSubset(a, b)).toEqual(true);
    });
});
//# sourceMappingURL=isSubset.spec.js.map