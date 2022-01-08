export declare function diffFolders(folderAPath: string, folderBPath: string): Promise<Difference[]>;
export interface Difference {
    type: "added" | "removed" | "distinct";
    filePath: string;
    contentA?: string;
    contentB?: string;
}
//# sourceMappingURL=diffFolders.d.ts.map