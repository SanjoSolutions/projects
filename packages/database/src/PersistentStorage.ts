import { join } from "path"
import type { IFileSystem } from "./IFileSystem.js"
import type { IPersistentStorage } from "./IPersistentStorage.js"
import { PersistentFileSystem } from "./PersistentFileSystem.js"

export class PersistentStorage implements IPersistentStorage {
  private _path: string
  private _fileSystem: IFileSystem = new PersistentFileSystem()

  constructor(path: string) {
    this._path = path
  }

  async get(key: string): Promise<any> {
    const content = await this._fileSystem.getContent(
      this._generatePathForKey(key),
    )
    const data = content === null ? [] : JSON.parse(content)
    return data
  }

  async set(key: string, value: any): Promise<void> {
    await this._fileSystem.store(
      this._generatePathForKey(key),
      JSON.stringify(value, null, 2),
    )
  }

  _generatePathForKey(key: string): string {
    return join(this._path, key + ".json")
  }
}
