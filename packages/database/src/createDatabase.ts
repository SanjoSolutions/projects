import { Database } from './Database.js'
import type { IStorage } from './IStorage.js'

export function createDatabase(storage: IStorage) {
  const database = new Database(storage)
  return database
}
