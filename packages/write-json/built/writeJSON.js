"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJSON = void 0;
const write_file_1 = __importDefault(require("@sanjo/write-file"));
/**
 * Writes JSON into a file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {any} Content to write to file
 * @returns {Promise<void>}
 */
async function writeJSON(filePath, content) {
    const json = JSON.stringify(content, null, 2);
    await write_file_1.default(filePath, json);
}
exports.writeJSON = writeJSON;
//# sourceMappingURL=writeJSON.js.map