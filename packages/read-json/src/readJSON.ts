import { promises as fs } from "fs"

/**
 * Reads file with utf-8 encoding and parses it as JSON.
 * @param filePath {string} Path to file
 * @returns {Promise<any>} Contents of file parsed as JSON
 */
export async function readJSON(filePath: string): Promise<any> {
  const content = await fs.readFile(filePath, { encoding: "utf-8" })
  return JSON.parse(content)
}
