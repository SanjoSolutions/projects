import { IFileSystem } from './IFileSystem';
export declare class Database {
    _storeFilePath: string;
    _fileSystem: IFileSystem;
    _store: any[];
    constructor(storeFilePath: string, fileSystem: IFileSystem);
    store(data: any): Promise<void>;
    find(): any[];
}
//# sourceMappingURL=Database.d.ts.map