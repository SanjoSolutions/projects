import { fileExists } from "../file/fileExists.js"
import { appendCsv } from "../csv/appendCsv.js"

/**
 * Logs an array of errors to an file.
 * @param filePath {string} The file path of the error file
 * @param errors {{stringValue, lineNumber, file}[]} An array of error objects.
 * @returns {Promise<void>}
 */
export async function logErrors(filePath, errors) {
  if (errors.length > 0) {
    const rows = errors.map(({ stringValue, lineNumber, file }) => [
      stringValue,
      lineNumber,
      file,
    ])

    if (!(await fileExists(filePath))) {
      rows.unshift(["String", "Line Number", "File"])
    }

    await appendCsv(filePath, rows)
  }
}
