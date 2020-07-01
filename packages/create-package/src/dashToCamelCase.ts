export function dashToCamelCase (string: string): string {
  const parts = string.split('-')
  return [parts[0]].concat(parts.slice(1).map(string => string[0].toUpperCase() + string.substring(1))).join('')
}
