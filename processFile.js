import path from 'path'
import { promises as fs } from 'fs'
import { replaceStringValues as processXml } from './xml/replaceStringValues.js'
import { replaceStringValues as processJava } from './java/replaceStringValues.js'
import { logErrors } from './errors/logErrors.js'

/**
 * Processes a file.
 * When file is a .xml (except string.xml) or .java file then it substitutes strings.
 * Otherwise nothing is done with the file.
 * File is overwritten with the substituted content.
 * Errors are logged to error.csv in the current working directory.
 *
 * @param lookUp {Map<string, string>} Look-up
 * @param errorFilePath {string} File path to error.csv file
 * @param filePath {string} File path to file to process
 * @returns {Promise<void>}
 */
export async function processFile(lookUp, errorFilePath, filePath) {
  const extensionName = path.extname(filePath)

  if (['.xml', '.java'].includes(extensionName) && path.basename(filePath) !== 'string.xml') {
    const text = await fs.readFile(filePath, { encoding: 'utf-8' })

    let result
    switch (extensionName) {
      case '.xml':
        result = processXml(lookUp, text)
        break
      case '.java':
        result = processJava(lookUp, text)
        break
    }
    const { text: processedText, errors } = result

    const fullErrors = errors.map(error => ({ ...error, file: filePath }))
    await logErrors(errorFilePath, fullErrors)

    try {
      await fs.writeFile(filePath, processedText, { encoding: 'utf-8' })
    } catch (error) {
      console.error('Error')
    }
  }
}
