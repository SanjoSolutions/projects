export function packageNameToFolderName(packageName) {
    const scopePattern = '@[^/]+';
    const regExp = new RegExp(`^(?:${scopePattern}/)?(.+)$`);
    const match = regExp.exec(packageName);
    return match[1];
}
//# sourceMappingURL=packageNameToFolderName.js.map