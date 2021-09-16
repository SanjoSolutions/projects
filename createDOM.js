export function createDOM(htmlText) {
  return new DOMParser().parseFromString(htmlText, 'text/html')
}
