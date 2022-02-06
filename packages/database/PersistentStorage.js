import { PersistentFileSystem } from './PersistentFileSystem.js';
import { join } from 'path';
export class PersistentStorage {
    _path;
    _fileSystem = new PersistentFileSystem();
    constructor(path) {
        this._path = path;
    }
    async get(key) {
        const content = await this._fileSystem.getContent(this._generatePathForKey(key));
        const data = content === null ? [] : JSON.parse(content);
        return data;
    }
    async set(key, value) {
        await this._fileSystem.store(this._generatePathForKey(key), JSON.stringify(value, null, 2));
    }
    _generatePathForKey(key) {
        return join(this._path, key + '.json');
    }
}
//# sourceMappingURL=PersistentStorage.js.map