"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTemporaryDirectory = void 0;
const fs_1 = require("fs");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
async function makeTemporaryDirectory() {
    return await fs_1.promises.mkdtemp(os_1.default.tmpdir() + path_1.default.sep);
}
exports.makeTemporaryDirectory = makeTemporaryDirectory;
//# sourceMappingURL=makeTemporaryDirectory.js.map