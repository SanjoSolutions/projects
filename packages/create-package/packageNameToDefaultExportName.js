import { dashToCamelCase } from './dashToCamelCase.js'
export function packageNameToDefaultExportName(packageName) {
  const scopePattern = '@[^/]+'
  const regExp = new RegExp(`^(?:${scopePattern}/)?(.+)$`)
  const match = regExp.exec(packageName)
  const packageNameWithoutScope = match[1]
  return dashToCamelCase(packageNameWithoutScope)
}
//# sourceMappingURL=packageNameToDefaultExportName.js.map
