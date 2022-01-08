import { IStorage } from "./IStorage.js";
export declare class MemoryStorage implements IStorage {
    _data: Map<string, any>;
    get(key: string): any;
    set(key: string, value: any): void;
}
//# sourceMappingURL=MemoryStorage.d.ts.map