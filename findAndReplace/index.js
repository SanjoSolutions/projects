import path from 'path'
import { removeFile } from '../file/removeFile.js'
import { processFile } from '../processFile.js'
import { traverseDirectory } from '../traverseDirectory.js'
import { loadConfig } from './loadConfig.js'
import { readLookUp } from './readLookUp.js'

/**
 * Entry point of program.
 * 1. Reads the config from the file path that has been passed as first argument to the program.
 * 2. Reads the look-up from the path specified in the config.
 * 3. Removes the existing error.csv file from the current working directory.
 * 4. Traverses through all .java and .xml files (except string.xml) inside the directory specified in the config.
 *
 * Example config (config.json):
 * {
 *   "CSV_file": "/Users/joe/Documents/find_and_replace/data/example/lookup-file.csv",
 *   "source_code_path": "/Users/joe/Documents/find_and_replace/data/example/source"
 * }
 *
 * Example how to call the script:
 * cd find_and_replace
 * node --experimental-modules src/index.js data/example/config.json
 *
 * @example node --experimental-modules src/index.js data/example/config.json
 * @returns {Promise<void>}
 */
async function main() {
  const configFilePath = path.resolve(process.cwd(), process.argv[2])
  const config = await loadConfig(configFilePath)
  const lookUp = await readLookUp(config.CSV_file)
  const errorFilePath = path.resolve(process.cwd(), 'error.csv')
  await removeFile(errorFilePath)
  const processFileWithLookUp = processFile.bind(null, lookUp, errorFilePath)
  await traverseDirectory(config.source_code_path, processFileWithLookUp)
}

// Run
main().then(() => {}, console.error)
