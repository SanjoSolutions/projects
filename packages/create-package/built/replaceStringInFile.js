"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceStringInFile = void 0;
const escape_for_reg_exp_1 = __importDefault(require("@sanjo/escape-for-reg-exp"));
const read_file_1 = __importDefault(require("@sanjo/read-file"));
const write_file_1 = __importDefault(require("@sanjo/write-file"));
async function replaceStringInFile(filePath, stringToReplace, stringToReplaceWith) {
    let content = await read_file_1.default(filePath);
    content = content.replace(new RegExp(escape_for_reg_exp_1.default(stringToReplace), "g"), stringToReplaceWith);
    await write_file_1.default(filePath, content);
}
exports.replaceStringInFile = replaceStringInFile;
//# sourceMappingURL=replaceStringInFile.js.map