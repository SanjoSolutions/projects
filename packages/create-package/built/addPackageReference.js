"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPackageReference = void 0;
const read_file_1 = __importDefault(require("@sanjo/read-file"));
const write_file_1 = __importDefault(require("@sanjo/write-file"));
const lodash_sortby_1 = __importDefault(require("lodash.sortby"));
const lodash_sorteduniqby_1 = __importDefault(require("lodash.sorteduniqby"));
const path_1 = __importDefault(require("path"));
async function addPackageReference(tsconfigPath, referencePath) {
    const json = JSON.parse(await read_file_1.default(tsconfigPath));
    json.references.push({
        path: "." + path_1.default.sep + path_1.default.relative(path_1.default.dirname(tsconfigPath), referencePath),
    });
    const uniquePropertyName = "path";
    json.references = lodash_sorteduniqby_1.default(lodash_sortby_1.default(json.references, uniquePropertyName), uniquePropertyName);
    await write_file_1.default(tsconfigPath, JSON.stringify(json, null, 2));
}
exports.addPackageReference = addPackageReference;
//# sourceMappingURL=addPackageReference.js.map