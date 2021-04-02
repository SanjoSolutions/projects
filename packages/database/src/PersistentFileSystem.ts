import { promises as fs } from "fs";
import { IFileSystem } from "./IFileSystem.js";

const encoding = "utf-8";

export class PersistentFileSystem implements IFileSystem {
  async contains(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getContent(filePath: string): Promise<string | null> {
    return await fs.readFile(filePath, { encoding });
  }

  async store(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, { encoding });
  }
}
