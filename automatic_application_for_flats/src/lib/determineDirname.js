import { dirname } from 'path'
import { determineFilename } from './determineFilename.js'

export function determineDirname(importUrl) {
  return dirname(determineFilename(importUrl))
}
