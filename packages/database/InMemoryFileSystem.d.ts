import type { FilePath } from './FilePath.js';
import type { IFileEntry } from './IFileEntry.js';
import type { IFileSystem } from './IFileSystem.js';
export declare class InMemoryFileSystem implements IFileSystem {
    _files: Map<FilePath, IFileEntry>;
    contains(filePath: string): Promise<boolean>;
    getContent(filePath: string): Promise<string | null>;
    store(filePath: string, content: string): Promise<void>;
}
//# sourceMappingURL=InMemoryFileSystem.d.ts.map