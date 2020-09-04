"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
class FileSystem {
    constructor() {
        this._files = new Map();
    }
    async contains(filePath) {
        return this._files.has(filePath);
    }
    async getContent(filePath) {
        return (await this.contains(filePath)) ? this._files.get(filePath).content : null;
    }
    async store(filePath, content) {
        this._files.set(filePath, { content });
    }
}
exports.FileSystem = FileSystem;
//# sourceMappingURL=FileSystem.js.map