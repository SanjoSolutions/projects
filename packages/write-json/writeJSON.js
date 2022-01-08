import writeFile from '@sanjo/write-file'
/**
 * Writes JSON into a file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {any} Content to write to file
 * @returns {Promise<void>}
 */
export async function writeJSON(filePath, content) {
  const json = JSON.stringify(content, null, 2)
  await writeFile(filePath, json)
}
//# sourceMappingURL=writeJSON.js.map
