import { fileURLToPath } from 'url'

export function determineFilename(importUrl) {
  return fileURLToPath(importUrl)
}
