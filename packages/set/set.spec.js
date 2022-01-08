import { union, intersection, difference } from "./set.js";
test('union', () => {
    const a = new Set([1]);
    const b = new Set([2]);
    const c = union(a, b);
    expect(c).toEqual(new Set([1, 2]));
});
describe("intersection", () => {
    it("returns the intersection of two sets", () => {
        expect(intersection(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([2]));
    });
});
test('difference', () => {
    const a = new Set([1, 2]);
    const b = new Set([2]);
    const c = difference(a, b);
    expect(c).toEqual(new Set([1]));
});
//# sourceMappingURL=set.spec.js.map