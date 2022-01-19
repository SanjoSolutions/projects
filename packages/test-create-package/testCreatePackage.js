import createTemporaryNPMPackage from '@sanjo/create-temporary-npm-package';
import { removeRecursively } from '@sanjo/fs'
import testNpmInit from '@sanjo/test-npm-init';
import writeJSON from '@sanjo/write-json';
import { promises as fs } from 'fs';
import path from 'path';
export function testCreatePackage(createPackagePackageName, createPackagePackagePath, createPackagePackageArguments) {
    describe(createPackagePackageName, () => {
        let rootPath;
        beforeEach(async function () {
            rootPath = await createTemporaryNPMPackage({
                devDependencies: {
                    [createPackagePackageName]: `file:${createPackagePackagePath}`,
                },
            });
            const packagesPath = path.join(rootPath, 'packages');
            await fs.mkdir(packagesPath);
            await writeJSON(path.join(packagesPath, 'tsconfig.json'), {
                files: [],
                include: [],
                references: [],
            });
        });
        afterEach(async function () {
            await removeRecursively(rootPath)
        });
        it('creates a package', async () => {
            const expectedPath = path.join(createPackagePackagePath, 'expected');
            await testNpmInit(rootPath, createPackagePackageName, createPackagePackageArguments, expectedPath);
        });
    });
}
//# sourceMappingURL=testCreatePackage.js.map
