import { promises as fs } from "fs"

/**
 * Removes file.
 * @param filePath File path of the file to remove
 * @returns {Promise<void>}
 */
export async function removeFile(filePath) {
  try {
    await fs.unlink(filePath)
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error
    }
  }
}
