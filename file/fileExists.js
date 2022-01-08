import { constants as fsConstants, promises as fs } from 'fs'

/**
 * Checks if file exists.
 * @param filePath {string} Path to file
 * @returns {Promise<boolean>} True if file exists. False if file doesn't exist.
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath, fsConstants.W_OK | fsConstants.R_OK)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    } else {
      throw error
    }
  }
  return true
}
