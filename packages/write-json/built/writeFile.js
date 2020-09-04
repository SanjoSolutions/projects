"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const fs_1 = require("fs");
/**
 * Writes file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {string} Content to write to file
 * @returns {Promise<void>}
 */
async function writeFile(filePath, content) {
    await fs_1.promises.writeFile(filePath, content, { encoding: 'utf-8' });
}
exports.writeFile = writeFile;
//# sourceMappingURL=writeFile.js.map