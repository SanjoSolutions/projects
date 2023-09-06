import { describe, expect, it, jest } from "@jest/globals"
import { Dirent, PathLike, promises as fs } from "fs"
import path from "path"
import process from "process"
import { traverseDirectory } from "./traverseDirectory.js"

describe("traverseDirectory", () => {
  it("traverses a directory recursively", async () => {
    const directoryPath = "test"
    const basePath =
      (process.platform === "win32" ? "C:\\" : "/") + directoryPath

    jest.spyOn(path, "resolve").mockReturnValue(basePath)
    jest.spyOn(fs, "readdir").mockImplementation((directoryPath: PathLike) => {
      let directoryEntries: Dirent[]
      if (directoryPath === basePath) {
        directoryEntries = [
          {
            name: "1.js",
            isSymbolicLink() {
              return false
            },
            isFile() {
              return true
            },
          } as Dirent,
          {
            name: "2.js",
            isSymbolicLink() {
              return false
            },
            isFile() {
              return true
            },
          } as Dirent,
          {
            name: "folder1",
            isSymbolicLink() {
              return false
            },
            isFile() {
              return false
            },
            isDirectory() {
              return true
            },
          } as Dirent,
        ]
      } else if (directoryPath === path.join(basePath, "folder1")) {
        directoryEntries = [
          {
            name: "3.js",
            isSymbolicLink() {
              return false
            },
            isFile() {
              return true
            },
          } as Dirent,
        ]
      } else {
        directoryEntries = []
      }
      return Promise.resolve(directoryEntries)
    })

    const processFile = jest.fn<() => void>().mockReturnValue()

    await traverseDirectory(directoryPath, processFile)

    expect(processFile).toHaveBeenCalledTimes(3)
    expect(processFile).toHaveBeenNthCalledWith(1, path.join(basePath, "1.js"))
    expect(processFile).toHaveBeenNthCalledWith(2, path.join(basePath, "2.js"))
    expect(processFile).toHaveBeenNthCalledWith(
      3,
      path.join(basePath, "folder1", "3.js"),
    )
  })
})
