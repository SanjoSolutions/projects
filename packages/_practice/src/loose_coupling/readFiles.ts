import { extname, relative } from "path"
import { extensionToContentType } from "./extensionToContentType.js"
import type { MIMEType } from "./MIMEType.js"
import { readFile } from "./readFile.js"
import { traverseDirectory } from "./traverseDirectory.js"

export async function readFiles(directoryToServeFrom: string): Promise<File[]> {
  const files: File[] = []

  async function processFile(entryPath: string) {
    const file = {
      pathname: relative(directoryToServeFrom, entryPath),
      contentType: extensionToContentType(extname(entryPath)),
      content: await readFile(entryPath),
    }
    files.push(file)
  }

  await traverseDirectory(directoryToServeFrom, processFile)
  return files
}

export interface File {
  pathname: string
  contentType: MIMEType
  content: string
}
