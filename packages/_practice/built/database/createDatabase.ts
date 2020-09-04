"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
const FileSystem_1 = require("./FileSystem");
const Database_1 = require("./Database");
function createDatabase() {
    const fileSystem = new FileSystem_1.FileSystem();
    const storeFilePath = 'store.json';
    const database = new Database_1.Database(storeFilePath, fileSystem);
    return { fileSystem, storeFilePath, database };
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=createDatabase.js.map