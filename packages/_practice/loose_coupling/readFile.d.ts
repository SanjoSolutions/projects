/// <reference types="node" />
/// <reference types="node" />
import type { PathLike } from 'fs';
import fs from 'fs/promises';
/**
 * Reads file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @returns {Promise<string>} Contents of file
 */
export declare function readFile(filePath: PathLike | fs.FileHandle): Promise<string>;
//# sourceMappingURL=readFile.d.ts.map