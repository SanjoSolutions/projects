"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentFileSystem = void 0;
const fs_1 = require("fs");
const encoding = 'utf-8';
class PersistentFileSystem {
    async contains(filePath) {
        try {
            await fs_1.promises.access(filePath);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getContent(filePath) {
        return await fs_1.promises.readFile(filePath, { encoding });
    }
    async store(filePath, content) {
        await fs_1.promises.writeFile(filePath, content, { encoding });
    }
}
exports.PersistentFileSystem = PersistentFileSystem;
//# sourceMappingURL=PersistentFileSystem.js.map