import { FilePath } from "./FilePath";
import { IFileEntry } from "./IFileEntry";
import { IFileSystem } from "./IFileSystem";
export declare class InMemoryFileSystem implements IFileSystem {
    _files: Map<FilePath, IFileEntry>;
    contains(filePath: string): Promise<boolean>;
    getContent(filePath: string): Promise<string | null>;
    store(filePath: string, content: string): Promise<void>;
}
//# sourceMappingURL=InMemoryFileSystem.d.ts.map