import { Cache } from './Cache.js';
export declare function createCachingFunction<T extends Function>(fn: T): {
    (...args: any[]): any;
    cache: Cache;
};
//# sourceMappingURL=createCachingFunction.d.ts.map