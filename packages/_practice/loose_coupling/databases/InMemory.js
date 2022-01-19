export class InMemory {
    _collection = [];
    save(model) {
        this._collection.push(model);
    }
    find() {
        return this._collection;
    }
}
//# sourceMappingURL=InMemory.js.map