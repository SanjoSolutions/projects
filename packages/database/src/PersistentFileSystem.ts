import { promises as fs } from 'fs'
import { IFileSystem } from './IFileSystem.js'
import { mkdir } from 'fs/promises'
import { dirname } from 'path'

const encoding = 'utf-8'

export class PersistentFileSystem implements IFileSystem {
  async contains(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath)
      return true
    } catch (error) {
      return false
    }
  }

  async getContent(filePath: string): Promise<string | null> {
    try {
      return await fs.readFile(filePath, { encoding })
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return null
      } else {
        throw error
      }
    }
  }

  async store(filePath: string, content: string): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, content, { encoding })
  }
}
