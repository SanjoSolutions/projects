import { describe, expect, it, jest } from "@jest/globals"
import type { PathLike } from "fs"
import { promises as fs } from "fs"
import type { FileHandle } from "fs/promises"
import { InMemoryFileSystem } from "./InMemoryFileSystem.js"
import { PersistentFileSystem } from "./PersistentFileSystem.js"

function mockFileSystem() {
  const mockedFileSystem = new InMemoryFileSystem()
  jest.spyOn(fs, "access").mockImplementation(async function access(
    filePath: PathLike,
  ): Promise<undefined> {
    if (await mockedFileSystem.contains(filePath as string)) {
      return undefined
    } else {
      throw new Error("File not found")
    }
  })
  jest.spyOn(fs, "readFile").mockImplementation(async function readFile(
    filePath: PathLike | FileHandle,
  ): Promise<string> {
    const content = await mockedFileSystem.getContent(filePath as string)
    return content ?? ""
  })
  jest.spyOn(fs, "writeFile").mockImplementation(async function writeFile(
    filePath: PathLike | FileHandle,
    content: string | Uint8Array,
  ): Promise<void> {
    await mockedFileSystem.store(filePath as string, content as string)
  })
  return mockedFileSystem
}

async function storeFile() {
  const content = JSON.stringify({ a: 1 })
  const filePath = "store.json"
  const fileSystem = new PersistentFileSystem()
  await fileSystem.store(filePath, content)
  return { fileSystem, filePath, content }
}

describe("PersistentFileStorage", () => {
  it("stores files on the hard disk", async () => {
    mockFileSystem()
    const { fileSystem, filePath, content } = await storeFile()
    expect(await fileSystem.getContent(filePath)).toEqual(content)
  })

  describe("contains", () => {
    it("returns true when a file exists on the path", async () => {
      mockFileSystem()
      const { fileSystem, filePath } = await storeFile()
      expect(await fileSystem.contains(filePath)).toEqual(true)
    })
  })
})
