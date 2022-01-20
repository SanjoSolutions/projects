export declare function nOutOf<T>(n: number, set: Set<T>): Set<Set<T>>;
export declare namespace nOutOf {
    var indexSubSequencesCache: Cache;
}
declare class Cache {
    private _cache;
    has(length: number, n: number): boolean;
    get(length: number, n: number): number[][] | null;
    set(length: number, n: number, item: number[][]): void;
    clear(): void;
}
export {};
//# sourceMappingURL=nOutOf.d.ts.map