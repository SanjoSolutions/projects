import { Database } from './Database'
import { InMemoryFileSystem } from './InMemoryFileSystem'

export function createDatabase () {
  const fileSystem = new InMemoryFileSystem()
  const storeFilePath = 'store.json'
  const database = new Database(storeFilePath, fileSystem)
  return { fileSystem, storeFilePath, database }
}
