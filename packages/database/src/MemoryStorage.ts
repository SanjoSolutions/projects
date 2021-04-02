import { IStorage } from "./IStorage";

export class MemoryStorage implements IStorage {
  _data: Map<string, any> = new Map();

  get(key: string) {
    return this._data.get(key);
  }

  set(key: string, value: any) {
    this._data.set(key, value);
  }
}
