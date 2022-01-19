import { promises as fs } from 'fs';
import path from 'path';
/**
 * Traverses given directory recursively and calls the given processFile function for each file found.
 * Supports symbolic links.
 * @param directoryPath {string} Directory path to recursively traverse
 * @param processFile {function} Function to call for each file found.
 * @returns {Promise<void>}
 */
export async function traverseDirectory(directoryPath, processFile) {
    let directoryPaths = [directoryPath];
    let nextDirectoryPaths = [];
    while (directoryPaths.length >= 1) {
        for (const directoryPath of directoryPaths) {
            let directoryEntries = await fs.readdir(directoryPath, {
                withFileTypes: true,
            });
            for (const directoryEntry of directoryEntries) {
                const entryFilename = directoryEntry.name;
                const entryPath = path.join(directoryPath, entryFilename);
                const stats = directoryEntry.isSymbolicLink() ? await fs.stat(entryPath) : directoryEntry;
                if (stats.isFile()) {
                    // const relativePath = path.relative(directoryPath, entryPath)
                    await processFile(entryPath);
                }
                else if (stats.isDirectory()) {
                    nextDirectoryPaths.push(entryPath);
                }
            }
        }
        directoryPaths = nextDirectoryPaths;
        nextDirectoryPaths = [];
    }
}
//# sourceMappingURL=traverseDirectory.js.map