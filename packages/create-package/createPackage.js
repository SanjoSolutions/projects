import { packageNameToFolderName } from "@sanjo/package-name-to-folder-name";
import { promises as fs } from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { __dirname } from "./__dirname.js";
import { addPackageReference } from "./addPackageReference.js";
import { replaceStringsInFile } from "./replaceStringsInFile.js";
const copyRecursively = promisify(ncp);
export async function createPackage() {
    const args = process.argv.slice(2);
    const packageName = args[0];
    const packageDescription = args[1];
    const packageFolderName = packageNameToFolderName(packageName);
    const templatePath = path.resolve(__dirname(import.meta.url), "template/");
    const packagesPath = path.resolve(process.cwd(), "packages");
    await fs.mkdir(packagesPath, { recursive: true });
    const destinationPath = path.join(packagesPath, packageFolderName);
    await copyRecursively(templatePath, destinationPath);
    const replacements = new Map([
        ["<PACKAGE_NAME>", packageName],
        ["<PACKAGE_DESCRIPTION>", packageDescription],
        ["<PACKAGE_FOLDER_NAME>", packageFolderName],
    ]);
    await replaceStringsInFile(path.resolve(destinationPath, "package.json"), replacements);
    await replaceStringsInFile(path.resolve(destinationPath, "README.md"), replacements);
    await addPackageReference(path.join(packagesPath, "tsconfig.json"), destinationPath);
    return destinationPath;
}
//# sourceMappingURL=createPackage.js.map