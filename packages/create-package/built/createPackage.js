"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackage = void 0;
const fs_1 = require("fs");
const ncp_1 = require("ncp");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const addPackageReference_1 = require("./addPackageReference");
const packageNameToDefaultExportName_1 = require("./packageNameToDefaultExportName");
const packageNameToFolderName_1 = require("./packageNameToFolderName");
const replaceStringsInFile_1 = require("./replaceStringsInFile");
const copyRecursively = util_1.promisify(ncp_1.ncp);
async function createPackage() {
    const args = process.argv.slice(2);
    const packageName = args[0];
    const packageDescription = args[1];
    const packageFolderName = packageNameToFolderName_1.packageNameToFolderName(packageName);
    const defaultExportName = packageNameToDefaultExportName_1.packageNameToDefaultExportName(packageName);
    const templatePath = path_1.default.resolve(__dirname, '../template/');
    const packagesPath = path_1.default.resolve(process.cwd(), 'packages');
    await fs_1.promises.mkdir(packagesPath, { recursive: true });
    const destinationPath = path_1.default.join(packagesPath, packageFolderName);
    await copyRecursively(templatePath, destinationPath);
    const replacements = new Map([
        ['<PACKAGE_NAME>', packageName],
        ['<PACKAGE_DESCRIPTION>', packageDescription],
        ['<PACKAGE_DEFAULT_EXPORT>', defaultExportName],
    ]);
    await replaceStringsInFile_1.replaceStringsInFile(path_1.default.resolve(destinationPath, 'package.json'), replacements);
    await replaceStringsInFile_1.replaceStringsInFile(path_1.default.resolve(destinationPath, 'README.md'), replacements);
    await addPackageReference_1.addPackageReference(path_1.default.join(packagesPath, 'tsconfig.json'), destinationPath);
    return destinationPath;
}
exports.createPackage = createPackage;
//# sourceMappingURL=createPackage.js.map