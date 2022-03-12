import path from 'path'
import { determineDirname } from './determineDirname.js'
import { replaceExtension } from './replaceExtension.js'

const __dirname = determineDirname(import.meta.url)

export function getScreenshotFilePath(flatOffer) {
  return path.resolve(__dirname, '../..', 'screenshots', replaceExtension(flatOffer.url, '.png'))
}
