"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSON = void 0;
const read_file_1 = __importDefault(require("@sanjo/read-file"));
/**
 * Reads file with utf-8 encoding and parses it as JSON.
 * @param filePath {string} Path to file
 * @returns {Promise<any>} Contents of file parsed as JSON
 */
async function readJSON(filePath) {
    const content = await read_file_1.default(filePath);
    return JSON.parse(content);
}
exports.readJSON = readJSON;
//# sourceMappingURL=readJSON.js.map