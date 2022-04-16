import { Cache, FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE } from './Cache.js';
export class ObjectCache {
    _cache = new Cache();
    has(key) {
        const keyArray = this._convertKeyToArray(key);
        return this._cache.has(keyArray);
    }
    get(key) {
        const keyArray = this._convertKeyToArray(key);
        try {
            return this._cache.retrieve(keyArray);
        }
        catch (error) {
            if (error.message === FAILED_TO_RETRIEVE_VALUE_ERROR_MESSAGE) {
                return null;
            }
            else {
                throw error;
            }
        }
    }
    set(key, value) {
        const keyArray = this._convertKeyToArray(key);
        this._cache.set(keyArray, value);
    }
    clear() {
        this._cache.clear();
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
//# sourceMappingURL=ObjectCache.js.map