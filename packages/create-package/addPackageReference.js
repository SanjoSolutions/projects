import readFile from "@sanjo/read-file";
import writeFile from "@sanjo/write-file";
import sortBy from "lodash.sortby";
import sortedUniqBy from "lodash.sorteduniqby";
import path from "path";
export async function addPackageReference(tsconfigPath, referencePath) {
    const json = JSON.parse(await readFile(tsconfigPath));
    json.references.push({
        path: "./" + path.relative(path.dirname(tsconfigPath), referencePath),
    });
    const uniquePropertyName = "path";
    json.references = sortedUniqBy(sortBy(json.references, uniquePropertyName), uniquePropertyName);
    await writeFile(tsconfigPath, JSON.stringify(json, null, 2));
}
//# sourceMappingURL=addPackageReference.js.map