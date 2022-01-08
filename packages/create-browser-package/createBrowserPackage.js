import createPackage from "@sanjo/create-package";
import readJSON from "@sanjo/read-json";
import writeJSON from "@sanjo/write-json";
import path from "path";
export async function createBrowserPackage() {
    const packagePath = await createPackage();
    await adjustPackageJSON(packagePath);
    await adjustTsconfigJSON(packagePath);
}
async function adjustPackageJSON(packagePath) {
    console.log("adjustPackageJSON", packagePath);
    const packageJSONPath = path.join(packagePath, "package.json");
    const packageJSON = await readJSON(packageJSONPath);
    if (!packageJSON.hasOwnProperty("scripts")) {
        packageJSON.scripts = {};
    }
    packageJSON.scripts["build"] = "webpack";
    packageJSON.scripts["build:watch"] = "webpack-dev-server --open";
    await writeJSON(packageJSONPath, packageJSON);
}
async function adjustTsconfigJSON(packagePath) {
    console.log("adjustTsconfigJSON", packagePath);
    const tsconfigJSONPath = path.join(packagePath, "tsconfig.json");
    const tsconfigJSON = await readJSON(tsconfigJSONPath);
    tsconfigJSON.compilerOptions.module = "ES2020";
    tsconfigJSON.compilerOptions.lib.push("DOM");
    await writeJSON(tsconfigJSONPath, tsconfigJSON);
}
//# sourceMappingURL=createBrowserPackage.js.map