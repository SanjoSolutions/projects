import createPackage from '@sanjo/create-package'
import readJSON from '@sanjo/read-json'
import writeJSON from '@sanjo/write-json'
import path from 'path'

export async function createBrowserPackage() {
  const packagePath = await createPackage()
  await adjustPackageJSON(packagePath)
  await adjustTsconfigJSON(packagePath)
}

async function adjustPackageJSON(packagePath: string): Promise<void> {
  const packageJSONPath = path.join(packagePath, 'package.json')
  const packageJSON = await readJSON(packageJSONPath)
  const packageJSONEntries = Object.entries(packageJSON)
  const scripts = {
    build: 'webpack',
    'build:watch': 'webpack-dev-server --open',
  }
  const repositoryEntryIndex = packageJSONEntries.findIndex(entry => entry[0] === 'repository')
  packageJSONEntries.splice(repositoryEntryIndex + 1, 0, ['scripts', scripts])
  const modifiedPackageJSON = Object.fromEntries(packageJSONEntries)
  await writeJSON(packageJSONPath, modifiedPackageJSON)
}

async function adjustTsconfigJSON(packagePath: string): Promise<void> {
  const fileNames = ['tsconfig.json', 'tsconfig-build.json']
  for (const fileName of fileNames) {
    const tsconfigJSONPath = path.join(packagePath, fileName)
    const tsconfigJSON = await readJSON(tsconfigJSONPath)
    tsconfigJSON.compilerOptions.module = 'ES2020'
    tsconfigJSON.compilerOptions.lib.push('DOM')
    await writeJSON(tsconfigJSONPath, tsconfigJSON)
  }
}
