import fs from 'fs/promises';
/**
 * Reads file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @returns {Promise<string>} Contents of file
 */
export async function readFile(filePath) {
    return await fs.readFile(filePath, { encoding: 'utf-8' });
}
//# sourceMappingURL=readFile.js.map