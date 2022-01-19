import type { PathLike } from 'fs'
import fs from 'fs/promises'

/**
 * Reads file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @returns {Promise<string>} Contents of file
 */
export async function readFile(filePath: PathLike | fs.FileHandle) {
  return await fs.readFile(filePath, { encoding: 'utf-8' })
}
