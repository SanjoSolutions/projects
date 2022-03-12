import type { IFileSystem } from './IFileSystem.js';
export declare class PersistentFileSystem implements IFileSystem {
    contains(filePath: string): Promise<boolean>;
    getContent(filePath: string): Promise<string | null>;
    store(filePath: string, content: string): Promise<void>;
}
//# sourceMappingURL=PersistentFileSystem.d.ts.map