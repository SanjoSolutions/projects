import { readFile } from "@sanjo/read-file";

export async function retrieveDependencies(tocFilePath: string) {
  const content = await readFile(tocFilePath);
  const dependenciesRegExp = /^## (Dep\w*|RequiredDeps|OptionalDeps): *(.+) *$/gm;
  let match;
  let dependencies: string[] = [];
  while ((match = dependenciesRegExp.exec(content))) {
    dependencies = dependencies.concat(match ? match[2].split(", ") : []);
  }
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
