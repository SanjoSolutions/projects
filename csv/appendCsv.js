import { appendFile } from '../file/appendFile.js'
import { csvToText } from './csvToText.js'

/**
 * Appends rows to existing CSV file.
 * @param filePath {string} Path to CSV file
 * @param csv {any[][]} Array of rows. Each row is an array with all the cells.
 * @returns {Promise<void>}
 */
export async function appendCsv (filePath, csv) {
  await appendFile(filePath, csvToText(csv))
}
