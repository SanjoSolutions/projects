import { readFile } from '../packages/readFile/readFile.js'
import { parseCsv } from './parseCsv.js'

/**
 * Reads a CSV file from disk and returns the parsed CSV.
 * @param csvFilePath Path of the CSV file
 * @returns {Promise<any[][]>} Parsed CSV
 */
export async function readCsv (csvFilePath) {
  const text = await readFile(csvFilePath)
  return parseCsv(text)
}
