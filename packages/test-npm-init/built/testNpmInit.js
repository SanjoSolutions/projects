"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNpmInit = void 0;
const diff_folders_1 = __importDefault(require("@sanjo/diff-folders"));
const npm_init_1 = __importDefault(require("@sanjo/npm-init"));
const path_1 = __importDefault(require("path"));
async function testNpmInit(rootPath, createPackageName, args, expectedPath) {
    await npm_init_1.default(rootPath, createPackageName, args);
    const createdPackagePath = path_1.default.join(rootPath, 'packages', 'test-package');
    const differences = await diff_folders_1.default(createdPackagePath, expectedPath);
    expect(differences).toEqual([]);
}
exports.testNpmInit = testNpmInit;
//# sourceMappingURL=testNpmInit.js.map