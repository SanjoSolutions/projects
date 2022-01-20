export class NOutOfCache {
    _cache = new Map();
    has(length, n) {
        const a = this._cache.get(length);
        if (a) {
            return a.has(n);
        }
        else {
            return false;
        }
    }
    get(length, n) {
        const a = this._cache.get(length);
        if (a) {
            return a.get(n) ?? null;
        }
        else {
            return null;
        }
    }
    set(length, n, item) {
        let a = this._cache.get(length);
        if (!a) {
            a = new Map();
            this._cache.set(length, a);
        }
        a.set(n, item);
    }
    clear() {
        this._cache = new Map();
    }
}
//# sourceMappingURL=NOutOfCache.js.map