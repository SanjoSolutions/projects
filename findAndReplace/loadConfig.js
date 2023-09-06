import path from "path"
import { readFile } from "../packages/readFile/readFile.js"

/**
 * Loads the config.json.
 * @param configFilePath {string} File path to the config.json
 * @returns {Promise<{CSV_file, source_code_path}>} Parsed config.
 */
export async function loadConfig(configFilePath) {
  const config = JSON.parse(await readFile(configFilePath))
  config.CSV_file = path.resolve(configFilePath, config.CSV_file)
  config.source_code_path = path.resolve(
    configFilePath,
    config.source_code_path,
  )
  return config
}
