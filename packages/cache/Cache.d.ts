export declare const FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE = "Failed to retrieve value.";
export declare class Cache<T = any> {
    _cache: Map<any, any>;
    constructor();
    has(key: any): boolean;
    retrieve(key: any): T;
    set(key: any, value: T): void;
    clear(): void;
    _convertKeyToArray(key: any): any[];
    _retrieveValue(key: any, onMiss: () => any): any;
}
//# sourceMappingURL=Cache.d.ts.map