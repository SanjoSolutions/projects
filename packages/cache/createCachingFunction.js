import { Cache } from './Cache';
export function createCachingFunction(fn) {
    const cache = new Cache();
    const cachingFunction = function (...args) {
        let result;
        if (cache.has(args)) {
            result = cache.retrieve(args);
        }
        else {
            result = fn(...args);
            cache.set(args, result);
        }
        return result;
    };
    cachingFunction.cache = cache;
    return cachingFunction;
}
//# sourceMappingURL=createCachingFunction.js.map