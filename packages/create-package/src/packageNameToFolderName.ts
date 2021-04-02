export function packageNameToFolderName(packageName: string): string {
  const scopePattern = "@[^/]+"
  const regExp = new RegExp(`^(?:${scopePattern}/)?(.+)$`)
  const match = regExp.exec(packageName)
  return match![1]
}
