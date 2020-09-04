"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceStringsInFile = void 0;
const read_file_1 = __importDefault(require("@sanjo/read-file"));
const write_file_1 = __importDefault(require("@sanjo/write-file"));
const replaceString_1 = require("./replaceString");
async function replaceStringsInFile(filePath, replacements) {
    let content = await read_file_1.default(filePath);
    for (const [stringToReplace, stringToReplaceWith] of replacements.entries()) {
        content = replaceString_1.replaceString(content, stringToReplace, stringToReplaceWith);
    }
    await write_file_1.default(filePath, content);
}
exports.replaceStringsInFile = replaceStringsInFile;
//# sourceMappingURL=replaceStringsInFile.js.map