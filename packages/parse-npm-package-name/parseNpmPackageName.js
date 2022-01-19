export function parseNpmPackageName(packageName) {
    let scope, name;
    if (packageName.includes('/')) {
        ;
        [scope, name] = packageName.split('/');
    }
    else {
        scope = null;
        name = packageName;
    }
    return { scope, name };
}
//# sourceMappingURL=parseNpmPackageName.js.map