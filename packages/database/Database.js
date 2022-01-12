import { Collection } from './Collection.js';
export class Database {
    _storage;
    _collections;
    constructor(storage) {
        this._storage = storage;
        this._collections = new Map();
    }
    async createCollection(collectionName) {
        const collection = new Collection(collectionName, this._storage);
        this._collections.set(collectionName, collection);
    }
    async getCollections() {
        return Array.from(this._collections.keys());
    }
    async getCollection(collectionName) {
        return this._collections.get(collectionName);
    }
}
//# sourceMappingURL=Database.js.map