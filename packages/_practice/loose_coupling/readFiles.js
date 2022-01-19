import { extname, relative } from 'path';
import { extensionToContentType } from './extensionToContentType.js';
import { readFile } from './readFile.js';
import { traverseDirectory } from './traverseDirectory.js';
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
//# sourceMappingURL=readFiles.js.map