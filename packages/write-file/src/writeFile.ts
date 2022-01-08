import { promises as fs } from 'fs'

/**
 * Writes file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {string} Content to write to file
 * @returns {Promise<void>}
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, { encoding: 'utf-8' })
}
