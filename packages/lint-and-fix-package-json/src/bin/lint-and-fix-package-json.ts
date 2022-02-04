#!/usr/bin/env node

import type { PathLike } from 'fs'
import { readdir } from 'fs/promises'
import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'
import { fix } from '../fix.js'
import readFile from '@sanjo/read-file'
import { writeFile } from '@sanjo/write-file'

const __dirname = dirname(fileURLToPath(import.meta.url))

const basePath = resolve(__dirname, '../..')
const packageFolderNames = await readDirectoriesFromDirectory(basePath)
for (const packageFolderName of packageFolderNames) {
  try {
    const path = join(basePath, packageFolderName)
    const packageJSONPath = join(path, 'package.json')
    const data = JSON.parse(await readFile(packageJSONPath))
    const output = fix(data, path)
    await writeFile(packageJSONPath, JSON.stringify(output, null, 2) + '\n')
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}

async function readDirectoriesFromDirectory(path: PathLike): Promise<string[]> {
  return (await readdir(path, { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => entry.name)
}
