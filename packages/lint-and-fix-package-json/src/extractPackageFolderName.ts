import { basename } from 'path'

export function extractPackageFolderName(path: string): string {
  return basename(path)
}
