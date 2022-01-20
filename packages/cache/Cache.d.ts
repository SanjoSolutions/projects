export declare class Cache<T> {
    private _cache;
    has(key: any): boolean;
    get(key: any): T | null;
    set(key: any, value: T): void;
    clear(): void;
    _convertKeyToArray(key: any): any[];
    _convertKeyObjectToArray(key: any): any[];
}
//# sourceMappingURL=Cache.d.ts.map