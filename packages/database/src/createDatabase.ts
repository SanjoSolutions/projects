import { Database } from "./Database";
import { InMemoryFileSystem } from "./InMemoryFileSystem";
import { IStorage } from "./IStorage";

export function createDatabase(storage: IStorage) {
  const database = new Database(storage);
  return database;
}
