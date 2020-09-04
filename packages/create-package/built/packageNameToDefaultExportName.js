"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageNameToDefaultExportName = void 0;
const dashToCamelCase_1 = require("./dashToCamelCase");
function packageNameToDefaultExportName(packageName) {
    const scopePattern = '@[^/]+';
    const regExp = new RegExp(`^(?:${scopePattern}/)?(.+)$`);
    const match = regExp.exec(packageName);
    const packageNameWithoutScope = match[1];
    return dashToCamelCase_1.dashToCamelCase(packageNameWithoutScope);
}
exports.packageNameToDefaultExportName = packageNameToDefaultExportName;
//# sourceMappingURL=packageNameToDefaultExportName.js.map