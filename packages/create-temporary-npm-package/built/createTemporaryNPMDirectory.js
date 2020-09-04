"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemporaryNPMPackage = void 0;
const create_npm_package_1 = __importDefault(require("@sanjo/create-npm-package"));
const make_temporary_directory_1 = __importDefault(require("@sanjo/make-temporary-directory"));
async function createTemporaryNPMPackage(packageJSON) {
    const tempPath = await make_temporary_directory_1.default();
    await create_npm_package_1.default(tempPath, packageJSON);
    return tempPath;
}
exports.createTemporaryNPMPackage = createTemporaryNPMPackage;
//# sourceMappingURL=createTemporaryNPMDirectory.js.map