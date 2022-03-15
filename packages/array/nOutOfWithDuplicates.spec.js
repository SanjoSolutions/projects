import { describe, test, expect } from '@jest/globals';
import { nOutOfWithDuplicates } from './nOutOfWithDuplicates.js';
describe('nOutOfWithDuplicates', () => {
    test('1', () => {
        const a = [1, 2];
        const result = nOutOfWithDuplicates(2, a);
        expect(result).toEqual([
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2]
        ]);
    });
    test('2', () => {
        const a = [1, 2];
        const result = nOutOfWithDuplicates(3, a);
        expect(result).toEqual([
            [1, 1, 1],
            [1, 1, 2],
            [1, 2, 1],
            [1, 2, 2],
            [2, 1, 1],
            [2, 1, 2],
            [2, 2, 1],
            [2, 2, 2]
        ]);
    });
});
//# sourceMappingURL=nOutOfWithDuplicates.spec.js.map