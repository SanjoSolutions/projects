export class Collection {
  _name
  _storage
  constructor(name, storage) {
    this._name = name
    this._storage = storage
  }
  async insert(dataEntry) {
    const collection = (await this._storage.get(this._name)) || []
    collection.push(dataEntry)
    await this._storage.set(this._name, collection)
  }
  async find() {
    const collection = (await this._storage.get(this._name)) || []
    return Array.from(collection)
  }
}
//# sourceMappingURL=Collection.js.map
