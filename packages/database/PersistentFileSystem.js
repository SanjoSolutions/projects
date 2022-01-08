import { promises as fs } from 'fs'
const encoding = 'utf-8'
export class PersistentFileSystem {
  async contains(filePath) {
    try {
      await fs.access(filePath)
      return true
    } catch (error) {
      return false
    }
  }
  async getContent(filePath) {
    return await fs.readFile(filePath, { encoding })
  }
  async store(filePath, content) {
    await fs.writeFile(filePath, content, { encoding })
  }
}
//# sourceMappingURL=PersistentFileSystem.js.map
