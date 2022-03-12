import path from 'path'
import { readJSON } from '../readJSON.js'
import jestConfig from '../../../jest.config.js'

export async function getWebServerPort() {
  return jestConfig.globals.__WEB_SERVER_PORT__
}
