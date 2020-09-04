"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCreatePackage = void 0;
const create_temporary_npm_package_1 = __importDefault(require("@sanjo/create-temporary-npm-package"));
const test_npm_init_1 = __importDefault(require("@sanjo/test-npm-init"));
const write_json_1 = __importDefault(require("@sanjo/write-json"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function testCreatePackage(createPackagePackageName, createPackagePackagePath, createPackagePackageArguments) {
    describe(createPackagePackageName, () => {
        let rootPath;
        beforeEach(async function () {
            rootPath = await create_temporary_npm_package_1.default({
                devDependencies: {
                    [createPackagePackageName]: `file:${createPackagePackagePath}`,
                },
            });
            const packagesPath = path_1.default.join(rootPath, 'packages');
            await fs_1.promises.mkdir(packagesPath);
            await write_json_1.default(path_1.default.join(packagesPath, 'tsconfig.json'), {
                'files': [],
                'include': [],
                'references': [],
            });
        });
        afterEach(async function () {
            await fs_1.promises.rmdir(rootPath, { recursive: true });
        });
        it('creates a package', async () => {
            const expectedPath = path_1.default.join(createPackagePackagePath, 'src/expected');
            await test_npm_init_1.default(rootPath, createPackagePackageName, createPackagePackageArguments, expectedPath);
        });
    });
}
exports.testCreatePackage = testCreatePackage;
//# sourceMappingURL=testCreatePackage.js.map