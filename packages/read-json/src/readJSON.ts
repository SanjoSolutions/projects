import { readFile } from '@sanjo/read-file'

/**
 * Reads file with utf-8 encoding and parses it as JSON.
 * @param filePath {string} Path to file
 * @returns {Promise<any>} Contents of file parsed as JSON
 */
export async function readJSON(filePath: string): Promise<any> {
  const content = await readFile(filePath)
  return JSON.parse(content)
}
