export class Collection {
    _name;
    _storage;
    constructor(name, storage) {
        this._name = name;
        this._storage = storage;
    }
    async insert(dataEntry) {
        const collection = (await this._storage.get(this._name)) || [];
        collection.push(dataEntry);
        await this._storage.set(this._name, collection);
    }
    async update(selector, update) {
        let collection = (await this._storage.get(this._name)) || [];
        const entriesToUpdate = collection.filter((entry) => this._isMatchingSelector(entry, selector));
        for (const entry of entriesToUpdate) {
            this._updateEntry(entry, update);
        }
        await this._storage.set(this._name, collection);
    }
    _isMatchingSelector(entry, selector) {
        return Object.entries(selector).every(([key, value]) => entry[key] === value);
    }
    _updateEntry(entry, update) {
        Object.assign(entry, update);
    }
    async find() {
        const collection = (await this._storage.get(this._name)) || [];
        return Array.from(collection);
    }
}
//# sourceMappingURL=Collection.js.map