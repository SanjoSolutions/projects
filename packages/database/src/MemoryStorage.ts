import { IStorage } from './IStorage.js'

export class MemoryStorage implements IStorage {
  _data: Map<string, any> = new Map()

  async get(key: string): Promise<any | undefined> {
    return this._data.get(key)
  }

  async set(key: string, value: any) {
    this._data.set(key, value)
  }
}
