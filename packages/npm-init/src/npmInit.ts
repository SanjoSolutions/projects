import { exec } from "@sanjo/exec"
import { parseNpmPackageName } from "@sanjo/parse-npm-package-name"

export async function npmInit(
  rootPath: string,
  createPackageName: string,
  args: string[],
): Promise<void> {
  let command = `npm init "${determineNpmInitNpmPackageName(
    createPackageName,
  )}"`
  const argsString = args.map((arg) => `"${arg}"`).join(" ")
  if (argsString.length >= 1) {
    command += ` ${argsString}`
  }
  const { stdout, stderr } = await exec(command, { cwd: rootPath })
}

export function determineNpmInitNpmPackageName(packageName: string): string {
  const { scope, name } = parseNpmPackageName(packageName)
  const namePartAfterCreate = /create-(.+)/.exec(name)![1]
  const packageNameForNpmInit = (scope ? `${scope}/` : "") + namePartAfterCreate
  return packageNameForNpmInit
}
