"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
const Database_1 = require("./Database");
function createDatabase(storage) {
    const database = new Database_1.Database(storage);
    return database;
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=createDatabase.js.map