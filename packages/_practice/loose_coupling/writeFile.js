import fs from 'fs/promises';
/**
 * Writes file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {string} Content to write to file
 * @returns {Promise<void>}
 */
export async function writeFile(filePath, content) {
    await fs.writeFile(filePath, content, { encoding: 'utf-8' });
}
//# sourceMappingURL=writeFile.js.map