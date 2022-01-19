import { describe, expect, it, jest } from '@jest/globals';
import { generateRandomFloat } from './generateRandomFloat.js';
describe('generateRandomFloat', () => {
    it('the returned number is exclusive of the max', () => {
        const max = 1;
        jest.spyOn(Math, 'random').mockReturnValue(0.99);
        const randomFloat = generateRandomFloat(0, max);
        expect(randomFloat).toBeLessThan(max);
    });
});
//# sourceMappingURL=generateRandomFloat.spec.js.map