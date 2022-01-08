export interface IFileSystem {
  contains(filePath: string): Promise<boolean>
  getContent(filePath: string): Promise<string | null>
  store(filePath: string, content: string): Promise<void>
}
//# sourceMappingURL=IFileSystem.d.ts.map
