import path from 'path'
import { readJSON } from '../readJSON.js'

export async function getWebServerPort() {
  return (await readJSON(path.resolve(__dirname, '../../../package.json'))).jest.globals.__WEB_SERVER_PORT__
}
