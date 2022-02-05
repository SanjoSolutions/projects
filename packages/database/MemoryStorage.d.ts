import { IStorage } from './IStorage.js';
export declare class MemoryStorage implements IStorage {
    _data: Map<string, any>;
    get(key: string): Promise<any | undefined>;
    set(key: string, value: any): Promise<void>;
}
//# sourceMappingURL=MemoryStorage.d.ts.map