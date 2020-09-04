"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
const Database_1 = require("./Database");
const InMemoryFileSystem_1 = require("./InMemoryFileSystem");
function createDatabase() {
    const fileSystem = new InMemoryFileSystem_1.InMemoryFileSystem();
    const storeFilePath = 'store.json';
    const database = new Database_1.Database(storeFilePath, fileSystem);
    return { fileSystem, storeFilePath, database };
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=createDatabase.js.map