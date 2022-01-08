jest.mock('@sanjo/read-file')
jest.mock('@sanjo/write-file')
import { addPackageReference } from './addPackageReference.js'
import readFile from '@sanjo/read-file'
import writeFile from '@sanjo/write-file'
describe('addPackageReference', () => {
  it('adds a package reference to the references of a tsconfig.json file', async () => {
    readFile.mockResolvedValue(`{
  "references": []
}`)
    const tsconfigPath = '/packages/tsconfig.json'
    const referencePath = '/packages/a-package'
    await addPackageReference(tsconfigPath, referencePath)
    expect(writeFile).toHaveBeenCalledWith(
      expect.anything(),
      `{
  "references": [
    {
      "path": "./a-package"
    }
  ]
}`
    )
  })
})
//# sourceMappingURL=addPackageReference.spec.js.map
