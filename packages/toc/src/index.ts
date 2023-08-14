import { readFile } from "@sanjo/read-file";
import { writeFile } from "@sanjo/write-file";
import * as path from "node:path";

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

export async function extractListedFiles(
  tocFilePath: string
): Promise<string[]> {
  const content = await readFile(tocFilePath);
  const lines = content.split(/(?:\n|\r\n|\r)/);
  const loadFileLines = lines.filter(isLoadFileLine);
  const loadedFiles = loadFileLines.map((line) => line.trim());
  return loadedFiles;
}

function isLoadFileLine(line: string): boolean {
  const trimmedLine = line.trim();
  return trimmedLine.length >= 1 && !isCommentLine(trimmedLine);
}

const COMMENT_LINE_REGEXP = /^##/;

function isCommentLine(line: string): boolean {
  return COMMENT_LINE_REGEXP.test(line);
}

enum GameVersion {
  "default" = "default",
  "vanilla" = "vanilla",
  "wrath" = "wrath",
}
type Dependency = string;
type ResolvedDependenciesForGameVersions = Map<GameVersion, Dependency[]>;

async function resolveDependencies(
  addOn: string
): Promise<ResolvedDependenciesForGameVersions> {
  const dependencies = new Map();
  const loadOrder = [];
  const alreadyLoadedAddOns = new Set();
  const resolvedAddOns = new Set();

  function addAddOnToLoadOrder(addOn: string) {
    loadOrder.push(addOn);
    alreadyLoadedAddOns.add(addOn);
  }

  resolvedAddOns.add(addOn);
  const content = await readTOCFile(addOn);
  const dependenciesRegExp = /^## (?:Dep\w*|RequireDeps): *(.+) *$/m;
  const match = dependenciesRegExp.exec(content);
  const addOnDependencies = match ? match[1].split(", ") : [];
  dependencies.set(addOn, addOnDependencies);
  for (const addOnDependencyName of addOnDependencies) {
    if (!resolvedAddOns.has(addOnDependencyName)) {
      await resolveDependencies(addOnDependencyName);
    }
  }
  const addOnsStillToLoad = addOnDependencies.filter(
    (addOn) => !alreadyLoadedAddOns.has(addOn)
  );
  addOnsStillToLoad.forEach(addAddOnToLoadOrder);
  if (!alreadyLoadedAddOns.has(addOn)) {
    addAddOnToLoadOrder(addOn);
  }

  return dependencies;
}

async function readTOCFile(tocFilePath: string): Promise<string> {
  return await readFile(tocFilePath);
}

export function retrieveAddOnTOCFilePath(addOnPath: string): string {
  const addOnName = retrieveAddOnName(addOnPath);
  const addOnTocFilePath = path.join(addOnPath, `${addOnName}.toc`);
  return addOnTocFilePath;
}

export function retrieveAddOnName(addOnPath: string): string {
  return path.basename(addOnPath);
}

export async function prependFilesToLoad(
  addOnTocFilePath: string,
  filesToLoad: string[]
): Promise<void> {
  let content = await readFile(addOnTocFilePath);
  const lines = content.split(/(?:\n|\r\n|\r)/);
  let firstLoadFileLineIndex = lines.findIndex(isLoadFileLine);
  const indexToInsert =
    firstLoadFileLineIndex !== -1 ? firstLoadFileLineIndex : lines.length;
  lines.splice(indexToInsert, 0, ...filesToLoad);
  content = lines.join("\n");
  await writeFile(addOnTocFilePath, content);
}
