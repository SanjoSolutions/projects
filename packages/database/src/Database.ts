import { Collection } from "./Collection";
import type { ICollection } from "./ICollection";
import { IStorage } from "./IStorage";

export class Database {
  _storage: IStorage;
  _collections: Map<string, ICollection>;

  constructor(storage: IStorage) {
    this._storage = storage;
    this._collections = new Map();
  }

  async createCollection(collectionName: string): Promise<void> {
    const collection = new Collection(collectionName, this._storage);
    this._collections.set(collectionName, collection);
  }

  async getCollections(): Promise<string[]> {
    return Array.from(this._collections.keys());
  }

  async getCollection(
    collectionName: string
  ): Promise<ICollection | undefined> {
    return this._collections.get(collectionName)!;
  }
}
