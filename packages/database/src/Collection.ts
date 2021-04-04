import type { ICollection } from "./ICollection.js";
import { IStorage } from "./IStorage.js";

export class Collection implements ICollection {
  _name: string;
  _storage: IStorage;

  constructor(name: string, storage: IStorage) {
    this._name = name;
    this._storage = storage;
  }

  async insert(dataEntry: any): Promise<void> {
    const collection = (await this._storage.get(this._name)) || [];
    collection.push(dataEntry);
    await this._storage.set(this._name, collection);
  }

  async find(): Promise<any[]> {
    const collection = (await this._storage.get(this._name)) || [];
    return Array.from(collection);
  }
}
