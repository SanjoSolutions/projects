/// <reference types="node" />
/// <reference types="node" />
import type { PathLike } from 'fs';
import fs from 'fs/promises';
/**
 * Writes file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {string} Content to write to file
 * @returns {Promise<void>}
 */
export declare function writeFile(filePath: PathLike | fs.FileHandle, content: string): Promise<void>;
//# sourceMappingURL=writeFile.d.ts.map