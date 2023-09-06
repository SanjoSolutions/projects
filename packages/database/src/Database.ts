import { Collection } from "./Collection.js"
import type { ICollection } from "./ICollection.js"
import type { IStorage } from "./IStorage.js"

export class Database {
  _storage: IStorage
  _collections: Map<string, ICollection>

  constructor(storage: IStorage) {
    this._storage = storage
    this._collections = new Map()
  }

  async createCollection(collectionName: string): Promise<ICollection> {
    const collection = new Collection(collectionName, this._storage)
    this._collections.set(collectionName, collection)
    return collection
  }

  async getCollections(): Promise<string[]> {
    return Array.from(this._collections.keys())
  }

  async getCollection(
    collectionName: string,
  ): Promise<ICollection | undefined> {
    return this._collections.get(collectionName)!
  }
}
