import type { ICollection } from "./ICollection.js"
import type { IStorage } from "./IStorage.js"

export class Collection implements ICollection {
  _name: string
  _storage: IStorage

  constructor(name: string, storage: IStorage) {
    this._name = name
    this._storage = storage
  }

  async insert(dataEntry: any): Promise<void> {
    const collection = (await this._storage.get(this._name)) || []
    collection.push(dataEntry)
    await this._storage.set(this._name, collection)
  }

  async update(selector: any, update: any): Promise<void> {
    let collection = (await this._storage.get(this._name)) || []
    const entriesToUpdate = collection.filter((entry: any) =>
      this._isMatchingSelector(entry, selector),
    )
    for (const entry of entriesToUpdate) {
      this._updateEntry(entry, update)
    }
    await this._storage.set(this._name, collection)
  }

  _isMatchingSelector(entry: any, selector: any) {
    return Object.entries(selector).every(
      ([key, value]) => entry[key] === value,
    )
  }

  _updateEntry(entry: any, update: any) {
    Object.assign(entry, update)
  }

  async find(): Promise<any[]> {
    const collection = (await this._storage.get(this._name)) || []
    return Array.from(collection)
  }
}
