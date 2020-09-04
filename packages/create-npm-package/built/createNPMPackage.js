"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNPMPackage = void 0;
const exec_1 = __importDefault(require("@sanjo/exec"));
const write_json_1 = __importDefault(require("@sanjo/write-json"));
const path_1 = __importDefault(require("path"));
async function createNPMPackage(packagePath, packageJSON) {
    const packageJSONContent = {
        private: true,
        packageJSON,
    };
    await write_json_1.default(path_1.default.join(packagePath, 'package.json'), packageJSONContent);
    await exec_1.default('npm install', { cwd: packagePath });
}
exports.createNPMPackage = createNPMPackage;
//# sourceMappingURL=createNPMPackage.js.map