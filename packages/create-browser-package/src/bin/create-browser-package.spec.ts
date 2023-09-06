import { afterEach, beforeEach, describe, it } from "@jest/globals"
import { removeRecursively } from "@sanjo/fs"
import { createFiles } from "@sanjo/test-create-package"
import testNpmInit from "@sanjo/test-npm-init"
import path from "path"

// This uses the built version.

const packageName = "@sanjo/test-package-for-create-browser-package"
const packageDescription = "Description of test package"

const createPackagePackageName = "@sanjo/create-browser-package"
const createPackagePackagePath = path.resolve(__dirname, "../..")
const createPackagePackageArguments = [packageName, packageDescription]

describe(createPackagePackageName, () => {
  let rootPath: string

  beforeEach(async function () {
    rootPath = await createFiles(
      createPackagePackageName,
      createPackagePackagePath,
    )
  })

  afterEach(async function () {
    await removeRecursively(rootPath)
  })

  it("creates a package", async () => {
    const expectedPath = path.join(createPackagePackagePath, "expected")
    await testNpmInit(
      rootPath,
      createPackagePackageName,
      createPackagePackageArguments,
      expectedPath,
    )
  })
})
