import path from 'path'

export function replaceExtension (filePath, newExtension) {
  return path.basename(filePath, path.extname(filePath)) + newExtension
}
