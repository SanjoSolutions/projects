import createPackage from "@sanjo/create-package"
import { __dirname } from "@sanjo/create-package/__dirname.js"
import { readJSON } from "@sanjo/read-json"
import { writeJSON } from "@sanjo/write-json"
import ncp from "ncp"
import path from "path"
import { promisify } from "util"

const copyRecursively = promisify(ncp)

export async function createBrowserPackage() {
  const packagePath = await createPackage()
  const templatePath = path.resolve(__dirname(import.meta.url), "../template/")
  await copyRecursively(templatePath, packagePath)
  await adjustPackageJSON(packagePath)
  await adjustTsconfigJSON(packagePath)
}

async function adjustPackageJSON(packagePath: string): Promise<void> {
  const packageJSONPath = path.join(packagePath, "package.json")
  const packageJSON = await readJSON(packageJSONPath)
  packageJSON.devDependencies["@sanjo/esbuild"] = "^1.0.0"
  const packageJSONEntries = Object.entries(packageJSON)
  const scripts = {
    development: "node ../../node_modules/@sanjo/esbuild/build/development.js",
    build: "node ../../node_modules/@sanjo/esbuild/build/build.js",
  }
  const repositoryEntryIndex = packageJSONEntries.findIndex(
    (entry) => entry[0] === "repository",
  )
  packageJSONEntries.splice(repositoryEntryIndex + 1, 0, ["scripts", scripts])
  const modifiedPackageJSON = Object.fromEntries(packageJSONEntries)
  await writeJSON(packageJSONPath, modifiedPackageJSON)
}

async function adjustTsconfigJSON(packagePath: string): Promise<void> {
  const fileNames = ["tsconfig.json", "tsconfig-build.json"]
  for (const fileName of fileNames) {
    const tsconfigJSONPath = path.join(packagePath, fileName)
    const tsconfigJSON = await readJSON(tsconfigJSONPath)
    tsconfigJSON.compilerOptions.lib = ["ES2022", "DOM"]
    tsconfigJSON.references.push({
      path: "../esbuild",
    })
    await writeJSON(tsconfigJSONPath, tsconfigJSON)
  }
}
