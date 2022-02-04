import { describe, expect, it } from '@jest/globals';
import { createInterpolatedString } from './createInterpolatedString.js';
describe('createInterpolatedString', () => {
    it('creates an interpolated string', () => {
        const animalA = 'dog';
        const animalB = 'cat';
        const string = createInterpolatedString(['The ', ' chases the ', '.'], animalA, animalB);
        const expectedString = `The ${animalA} chases the ${animalB}.`;
        expect(string).toEqual(expectedString);
    });
});
//# sourceMappingURL=createInterpolatedString.spec.js.map