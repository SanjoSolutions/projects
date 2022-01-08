import exec from "@sanjo/exec";
import writeJSON from "@sanjo/write-json";
import path from "path";
export async function createNPMPackage(packagePath, packageJSON) {
    const packageJSONContent = {
        private: true,
        packageJSON,
    };
    await writeJSON(path.join(packagePath, "package.json"), packageJSONContent);
    await exec("npm install", { cwd: packagePath });
}
//# sourceMappingURL=createNPMPackage.js.map