import { dashToCamelCase } from "./dashToCamelCase"

export function packageNameToDefaultExportName(packageName: string): string {
  const scopePattern = "@[^/]+"
  const regExp = new RegExp(`^(?:${scopePattern}/)?(.+)$`)
  const match = regExp.exec(packageName)
  const packageNameWithoutScope = match![1]
  return dashToCamelCase(packageNameWithoutScope)
}
