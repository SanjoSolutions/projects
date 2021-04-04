import { FilePath } from "./FilePath.js";
import { IFileEntry } from "./IFileEntry.js";
import { IFileSystem } from "./IFileSystem.js";

export class InMemoryFileSystem implements IFileSystem {
  _files: Map<FilePath, IFileEntry> = new Map();

  async contains(filePath: string): Promise<boolean> {
    return this._files.has(filePath);
  }

  async getContent(filePath: string): Promise<string | null> {
    return (await this.contains(filePath))
      ? this._files.get(filePath)!.content
      : null;
  }

  async store(filePath: string, content: string): Promise<void> {
    this._files.set(filePath, { content });
  }
}
