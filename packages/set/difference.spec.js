import { expect, test } from '@jest/globals';
import { difference } from './difference.js';
test('difference', () => {
    const a = new Set([1, 2]);
    const b = new Set([2]);
    const c = difference(a, b);
    expect(c).toEqual(new Set([1]));
});
//# sourceMappingURL=difference.spec.js.map