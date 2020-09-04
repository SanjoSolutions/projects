import { IFileSystem } from "./IFileSystem";
import { FilePath } from "./FilePath";
import { IFileEntry } from "./IFileEntry";
export declare class FileSystem implements IFileSystem {
    _files: Map<FilePath, IFileEntry>;
    contains(filePath: string): Promise<boolean>;
    getContent(filePath: string): Promise<string | null>;
    store(filePath: string, content: string): Promise<void>;
}
//# sourceMappingURL=FileSystem.d.ts.map