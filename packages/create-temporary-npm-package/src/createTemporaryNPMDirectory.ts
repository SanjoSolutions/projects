import createNPMPackage from '@sanjo/create-npm-package'
import makeTemporaryDirectory from '@sanjo/make-temporary-directory'

export async function createTemporaryNPMPackage (packageJSON: Object): Promise<string> {
  const tempPath = await makeTemporaryDirectory()
  await createNPMPackage(tempPath, packageJSON)
  return tempPath
}
