export function camelCaseToUnderscore (string: string): string {
  return string.replace(/[A-Z]/g, '_$&').toLowerCase()
}
