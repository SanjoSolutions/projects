import { expect } from "@jest/globals";
import { diffFolders } from "@sanjo/diff-folders";
import npmInit from "@sanjo/npm-init";
import { packageNameToFolderName } from "@sanjo/package-name-to-folder-name";
import path from "path";
export async function testNpmInit(rootPath, createPackageName, args, expectedPath) {
    await npmInit(rootPath, createPackageName, args);
    const createdPackagePath = path.join(rootPath, "packages", packageNameToFolderName(args[0]));
    const differences = await diffFolders(createdPackagePath, expectedPath);
    expect(differences).toEqual([]);
}
//# sourceMappingURL=testNpmInit.js.map