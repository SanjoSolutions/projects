import createTemporaryNPMPackage from '@sanjo/create-temporary-npm-package';
import { writeJSON } from '@sanjo/write-json';
import fs from 'fs/promises';
import path from 'path';
export async function createFiles(createPackagePackageName, createPackagePackagePath) {
    const rootPath = await createTemporaryNPMPackage({
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
    return rootPath;
}
//# sourceMappingURL=createFiles.js.map