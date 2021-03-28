import type { ICollection } from './ICollection';
import { IStorage } from './IStorage';
export declare class Database {
    _storage: IStorage;
    _collections: Map<string, ICollection>;
    constructor(storage: IStorage);
    createCollection(collectionName: string): Promise<void>;
    getCollections(): Promise<string[]>;
    getCollection(collectionName: string): Promise<ICollection | undefined>;
}
//# sourceMappingURL=Database.d.ts.map