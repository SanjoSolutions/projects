import type { IPersistentStorage } from "./IPersistentStorage";
export declare class PersistentStorage implements IPersistentStorage {
    private _path;
    private _fileSystem;
    constructor(path: string);
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    _generatePathForKey(key: string): string;
}
//# sourceMappingURL=PersistentStorage.d.ts.map