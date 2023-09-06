import {
  describe,
  it,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals"
import { extractPackageFolderName } from "./extractPackageFolderName.js"

describe("extractPackageFolderName", () => {
  it("extracts the package folder name from a path", () => {
    expect(extractPackageFolderName("packages/test")).toEqual("test")
  })
})
