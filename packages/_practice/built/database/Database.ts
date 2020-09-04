"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    constructor(storeFilePath, fileSystem) {
        this._store = [];
        this._storeFilePath = storeFilePath;
        this._fileSystem = fileSystem;
    }
    async store(data) {
        this._store.push(data);
        await this._fileSystem.store(this._storeFilePath, JSON.stringify(this._store));
    }
    find() {
        return this._store;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map