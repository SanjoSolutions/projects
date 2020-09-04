"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageNameToFolderName = void 0;
function packageNameToFolderName(packageName) {
    const scopePattern = '@[^/]+';
    const regExp = new RegExp(`^(?:${scopePattern}/)?(.+)$`);
    const match = regExp.exec(packageName);
    return match[1];
}
exports.packageNameToFolderName = packageNameToFolderName;
//# sourceMappingURL=packageNameToFolderName.js.map