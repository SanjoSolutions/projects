"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const { promises: fs } = require('fs');
/**
 * Reads file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @returns {Promise<string>} Contents of file
 */
async function readFile(filePath) {
    return await fs.readFile(filePath, { encoding: 'utf-8' });
}
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map