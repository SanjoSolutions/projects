import { PathLike, promises as fs } from "fs"

/**
 * Removes a file.
 * @param filePath File path of the file to remove.
 * @returns {Promise<void>}
 */
export async function removeFile(filePath: PathLike): Promise<void> {
  try {
    await fs.unlink(filePath)
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error
    }
  }
}
