"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserPackage = void 0;
const create_package_1 = __importDefault(require("@sanjo/create-package"));
const read_json_1 = __importDefault(require("@sanjo/read-json"));
const write_json_1 = __importDefault(require("@sanjo/write-json"));
const path_1 = __importDefault(require("path"));
async function createBrowserPackage() {
    const packagePath = await create_package_1.default();
    await adjustPackageJSON(packagePath);
    await adjustTsconfigJSON(packagePath);
}
exports.createBrowserPackage = createBrowserPackage;
async function adjustPackageJSON(packagePath) {
    console.log('adjustPackageJSON', packagePath);
    const packageJSONPath = path_1.default.join(packagePath, 'package.json');
    const packageJSON = await read_json_1.default(packageJSONPath);
    if (!packageJSON.hasOwnProperty('scripts')) {
        packageJSON.scripts = {};
    }
    packageJSON.scripts['build'] = 'webpack';
    packageJSON.scripts['build:watch'] = 'webpack-dev-server --open';
    await write_json_1.default(packageJSONPath, packageJSON);
}
async function adjustTsconfigJSON(packagePath) {
    console.log('adjustTsconfigJSON', packagePath);
    const tsconfigJSONPath = path_1.default.join(packagePath, 'tsconfig.json');
    const tsconfigJSON = await read_json_1.default(tsconfigJSONPath);
    tsconfigJSON.compilerOptions.module = 'ES2020';
    tsconfigJSON.compilerOptions.lib.push('DOM');
    await write_json_1.default(tsconfigJSONPath, tsconfigJSON);
}
//# sourceMappingURL=createBrowserPackage.js.map