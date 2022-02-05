import { promises as fs } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
const encoding = 'utf-8';
export class PersistentFileSystem {
    async contains(filePath) {
        try {
            await fs.access(filePath);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getContent(filePath) {
        try {
            return await fs.readFile(filePath, { encoding });
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return null;
            }
            else {
                throw error;
            }
        }
    }
    async store(filePath, content) {
        await mkdir(dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, { encoding });
    }
}
//# sourceMappingURL=PersistentFileSystem.js.map