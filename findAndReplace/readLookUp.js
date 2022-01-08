import { createLookUpFromCsv } from '../createLookUpFromCsv.js'
import { readCsv } from '../csv/readCsv.js'

/**
 * Reads the look-up from a CSV file.
 * @param csvFilePath {string} File path to CSV file.
 * @returns {Promise<Map<string, string>>} Parsed look-up.
 */
export async function readLookUp(csvFilePath) {
  const csv = await readCsv(csvFilePath)
  return createLookUpFromCsv(csv)
}
