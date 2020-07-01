import { createData } from './createData'
import { createDatabase } from './createDatabase'
import { Database } from './Database'

describe('Database', () => {
  it('stores data', async () => {
    const { database } = createDatabase()
    const data = createData()
    await database.store(data)

    function hasStoredData () {
      return database.find().length >= 1
    }

    expect(hasStoredData()).toEqual(true)
  })

  it('stores data on a file system', async () => {
    const { fileSystem, storeFilePath, database } = createDatabase()
    const data = createData()
    await database.store(data)

    async function hasStoredDataOnFileSystem () {
      expect(await fileSystem.contains(storeFilePath)).toEqual(true)
      expect(await fileSystem.getContent(storeFilePath)).toEqual('[{"a":1}]')
    }

    await hasStoredDataOnFileSystem()
  })

  // it.skip('can be access from multiple processes', () => { // database synchronization between servers
  //   const process1 = new Process()
  //   const process2 = new Process()
  // })
})
