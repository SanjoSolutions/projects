export function extensionToContentType(extension) {
  switch (extension) {
    case '.html':
      return 'text/html'
    default:
      return 'text/plain'
  }
}
