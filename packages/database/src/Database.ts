import { IFileSystem } from './IFileSystem'

export class Database {
  _storeFilePath: string
  _fileSystem: IFileSystem
  _store: any[] = []

  constructor (storeFilePath: string, fileSystem: IFileSystem) {
    this._storeFilePath = storeFilePath
    this._fileSystem = fileSystem
  }

  async store (data: any) {
    this._store.push(data)
    await this._fileSystem.store(this._storeFilePath, JSON.stringify(this._store))
  }

  find (): any[] {
    return this._store
  }
}
