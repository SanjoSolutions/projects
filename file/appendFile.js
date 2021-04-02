import { promises as fs } from "fs";

/**
 * Appends text to an file with utf-8 encoding.
 * @param filePath {string} Path to file
 * @param content {string} Content to append
 * @returns {Promise<void>}
 */
export async function appendFile(filePath, content) {
  await fs.writeFile(filePath, content, { encoding: "utf-8", flag: "a" });
}
