import { promises as fs } from "fs";
import os from "os";
import path from "path";

export async function makeTemporaryDirectory(): Promise<string> {
  return await fs.mkdtemp(os.tmpdir() + path.sep);
}
