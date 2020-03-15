import path from 'path'
import { replaceExtension } from './replaceExtension.js'

export function getScreenshotFilePath (flatOffer) {
  return path.resolve(
    __dirname,
    '../..',
    'screenshots',
    replaceExtension(flatOffer.url, '.png')
  )
}
