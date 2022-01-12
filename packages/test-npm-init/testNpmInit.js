import diffFolders from '@sanjo/diff-folders';
import npmInit from '@sanjo/npm-init';
import path from 'path';
export async function testNpmInit(rootPath, createPackageName, args, expectedPath) {
    await npmInit(rootPath, createPackageName, args);
    const createdPackagePath = path.join(rootPath, 'packages', 'test-package');
    const differences = await diffFolders(createdPackagePath, expectedPath);
    expect(differences).toEqual([]);
}
//# sourceMappingURL=testNpmInit.js.map