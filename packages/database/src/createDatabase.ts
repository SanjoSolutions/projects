import { Database } from './Database.js'
import { InMemoryFileSystem } from './InMemoryFileSystem.js'
import { IStorage } from './IStorage.js'

export function createDatabase(storage: IStorage) {
  const database = new Database(storage)
  return database
}
