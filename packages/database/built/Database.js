"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const Collection_1 = require("./Collection");
class Database {
    constructor(storage) {
        this._storage = storage;
        this._collections = new Map();
    }
    async createCollection(collectionName) {
        const collection = new Collection_1.Collection(collectionName, this._storage);
        this._collections.set(collectionName, collection);
    }
    async getCollections() {
        return Array.from(this._collections.keys());
    }
    async getCollection(collectionName) {
        return this._collections.get(collectionName);
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map