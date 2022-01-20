export class Multiset {
    _elements = new Map();
    add(value) {
        if (this._elements.has(value)) {
            this._elements.set(value, this._elements.get(value) + 1);
        }
        else {
            this._elements.set(value, 1);
        }
    }
    has(value) {
        return this._elements.has(value);
    }
    remove(value) {
        if (this._elements.has(value)) {
            const count = this.count(value);
            if (count > 1) {
                this._elements.set(value, count - 1);
            }
            else {
                this._elements.delete(value);
            }
        }
    }
    count(value) {
        if (this._elements.has(value)) {
            return this._elements.get(value);
        }
        else {
            return 0;
        }
    }
}
//# sourceMappingURL=Multiset.js.map