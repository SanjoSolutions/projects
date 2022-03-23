import { describe, it, expect, jest } from '@jest/globals';
import { add } from '@sanjo/mathematics';
import { createCachingFunction } from './createCachingFunction.js';
import { identity } from '@sanjo/identity';
describe('createCachingFunction', () => {
    it('caches the result', () => {
        const cachingAdd = createCachingFunction(add);
        jest.spyOn(cachingAdd.cache, 'set');
        const result = cachingAdd(1, 2);
        expect(cachingAdd.cache.set).toHaveBeenCalledWith([1, 2], result);
    });
    describe('when the result is cached', () => {
        it('returns the cached result', () => {
            const cachingFn = createCachingFunction(identity);
            const argument = 1;
            const mockedResult = {};
            cachingFn.cache.set([argument], mockedResult);
            jest.spyOn(cachingFn.cache, 'retrieve');
            const result = cachingFn(argument);
            expect(cachingFn.cache.retrieve).toHaveBeenCalledWith([argument]);
            expect(result).toBe(mockedResult);
        });
    });
});
//# sourceMappingURL=createCachingFunction.spec.js.map