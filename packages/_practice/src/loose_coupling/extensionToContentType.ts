import { MIMEType } from './MIMEType.js'

export function extensionToContentType(extension: string): MIMEType {
  switch (extension) {
    case '.html':
      return 'text/html'
    default:
      return 'text/plain'
  }
}
