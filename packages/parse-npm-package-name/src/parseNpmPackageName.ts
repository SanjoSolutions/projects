export function parseNpmPackageName(packageName: string) {
  let scope, name
  if (packageName.includes('/')) {
    ;[scope, name] = packageName.split('/')
  } else {
    scope = null
    name = packageName
  }
  return { scope, name }
}
