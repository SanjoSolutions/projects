import type { ICollection } from './ICollection.js';
import { IStorage } from './IStorage.js';
export declare class Collection implements ICollection {
    _name: string;
    _storage: IStorage;
    constructor(name: string, storage: IStorage);
    insert(dataEntry: any): Promise<void>;
    find(): Promise<any[]>;
}
//# sourceMappingURL=Collection.d.ts.map