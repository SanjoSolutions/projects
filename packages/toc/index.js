import { readFile } from '@sanjo/read-file';
export const dependenciesRegExp = /^## (Dep\w*|RequireDeps): *(.+) *$/m;
export async function retrieveDependencies(tocFilePath) {
    const content = await readFile(tocFilePath);
    const match = dependenciesRegExp.exec(content);
    const dependencies = match ? match[2].split(', ') : [];
    return dependencies;
}
//# sourceMappingURL=index.js.map