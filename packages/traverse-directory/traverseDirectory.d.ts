/**
 * Traverses given directory recursively and calls the given processFile function for each file found.
 * Supports symbolic links.
 * @param directoryPath {string} Directory path to recursively traverse
 * @param processFile {function} Function to call for each file found.
 * @returns {Promise<void>}
 */
export declare function traverseDirectory(directoryPath: string, processFile: (entryPath: string) => void | Promise<void>): Promise<void>;
//# sourceMappingURL=traverseDirectory.d.ts.map