"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSON = void 0;
const fs_1 = require("fs");
/**
 * Reads file with utf-8 encoding and parses it as JSON.
 * @param filePath {string} Path to file
 * @returns {Promise<any>} Contents of file parsed as JSON
 */
async function readJSON(filePath) {
    const content = await fs_1.promises.readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(content);
}
exports.readJSON = readJSON;
//# sourceMappingURL=readJSON.js.map