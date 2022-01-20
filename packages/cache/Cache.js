import { last } from '@sanjo/array';
export class Cache {
    _cache = new Map();
    has(key) {
        const keyArray = this._convertKeyToArray(key);
        let a = this._cache;
        for (const keyArrayElement of keyArray.slice(0, keyArray.length - 1)) {
            if (a.has(keyArrayElement)) {
                a = a.get(keyArrayElement);
            }
            else {
                return false;
            }
        }
        return a.has(last(keyArray));
    }
    get(key) {
        const keyArray = this._convertKeyToArray(key);
        let a = this._cache;
        for (const keyArrayElement of keyArray) {
            if (a.has(keyArrayElement)) {
                a = a.get(keyArrayElement);
            }
            else {
                return null;
            }
        }
        return a;
    }
    set(key, value) {
        const keyArray = this._convertKeyToArray(key);
        let a = this._cache;
        for (const keyArrayElement of keyArray.slice(0, keyArray.length - 1)) {
            let b;
            if (a.has(keyArrayElement)) {
                b = a.get(keyArrayElement);
            }
            else {
                b = new Map();
                a.set(keyArrayElement, b);
            }
            a = b;
        }
        a.set(last(keyArray), value);
    }
    clear() {
        this._cache = new Map();
    }
    _convertKeyToArray(key) {
        return this._convertKeyObjectToArray(key);
    }
    _convertKeyObjectToArray(key) {
        const propertyNames = Object.keys(key);
        propertyNames.sort();
        return propertyNames.map(propertyName => key[propertyName]);
    }
}
//# sourceMappingURL=Cache.js.map