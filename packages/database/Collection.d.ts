import type { ICollection } from './ICollection.js';
import type { IStorage } from './IStorage.js';
export declare class Collection implements ICollection {
    _name: string;
    _storage: IStorage;
    constructor(name: string, storage: IStorage);
    insert(dataEntry: any): Promise<void>;
    update(selector: any, update: any): Promise<void>;
    _isMatchingSelector(entry: any, selector: any): boolean;
    _updateEntry(entry: any, update: any): void;
    find(): Promise<any[]>;
}
//# sourceMappingURL=Collection.d.ts.map