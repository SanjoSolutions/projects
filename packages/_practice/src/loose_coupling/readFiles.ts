import { extname, relative } from "path";
import { extensionToContentType } from "./extensionToContentType";
import { readFile } from "./readFile";
import { traverseDirectory } from "./traverseDirectory";

export async function readFiles(directoryToServeFrom) {
  const files = [];

  async function processFile(entryPath) {
    const file = {
      pathname: relative(directoryToServeFrom, entryPath),
      contentType: extensionToContentType(extname(entryPath)),
      content: await readFile(entryPath),
    };
    files.push(file);
  }

  await traverseDirectory(directoryToServeFrom, processFile);
  return files;
}
