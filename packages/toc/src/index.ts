import { readFile } from "@sanjo/read-file";

export const dependenciesRegExp = /^## (Dep\w*|RequireDeps): *(.+) *$/m;

export async function retrieveDependencies(tocFilePath: string) {
  const content = await readFile(tocFilePath);
  const match = dependenciesRegExp.exec(content);
  const dependencies = match ? match[2].split(", ") : [];
  return dependencies;
}

export const versionRegExp = /## Version: (\d+\.\d+\.\d+)/;

export async function retrieveVersion(
  tocFilePath: string
): Promise<string | null> {
  const content = await readFile(tocFilePath);
  const match = versionRegExp.exec(content);
  return match ? match[1] : null;
}
