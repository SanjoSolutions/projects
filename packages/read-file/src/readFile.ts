import { promises as fs } from 'fs'

/**
 * Reads file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @returns {Promise<string>} Contents of file
 */
export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, { encoding: 'utf-8' })
}
