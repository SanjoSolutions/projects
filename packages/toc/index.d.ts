export declare function retrieveDependencies(tocFilePath: string): Promise<string[]>;
export declare const versionRegExp: RegExp;
export declare function retrieveVersion(tocFilePath: string): Promise<string | null>;
export declare function extractListedFiles(tocFilePath: string): Promise<string[]>;
export declare function retrieveAddOnTOCFilePath(addOnPath: string): string;
export declare function retrieveAddOnName(addOnPath: string): string;
export declare function prependFilesToLoad(addOnTocFilePath: string, filesToLoad: string[]): Promise<void>;
//# sourceMappingURL=index.d.ts.map