export class MemoryStorage {
    _data = new Map();
    async get(key) {
        return this._data.get(key);
    }
    async set(key, value) {
        this._data.set(key, value);
    }
}
//# sourceMappingURL=MemoryStorage.js.map