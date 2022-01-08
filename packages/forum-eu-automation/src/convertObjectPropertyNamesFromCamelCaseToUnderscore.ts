import { camelCaseToUnderscore } from './camelCaseToUnderscore.js'

export function convertObjectPropertyNamesFromCamelCaseToUnderscore(data: any): any {
  return Object.fromEntries(
    Object.entries(data).map(([propertyName, propertyValue]: [string, any]) => [
      camelCaseToUnderscore(propertyName),
      propertyValue,
    ])
  )
}
