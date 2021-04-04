import { createData } from "./createData.js";
import { createDatabase } from "./createDatabase.js";
import { Database } from "./Database.js";
import { ICollection } from "./ICollection.js";
import { MemoryStorage } from "./MemoryStorage.js";

describe("Database", () => {
  describe("storing", () => {
    describe("collections", () => {
      test("creating a collection", async () => {
        const {
          database,
        } = await createDatabaseWithMemoryStorageAndFilesCollection();

        expect(await database.getCollections()).toEqual(["files"]);
      });

      test("storing a data entry in a collection", async () => {
        const {
          collection,
          dataEntry,
        } = await createDatabaseWithMemoryStorageAndFilesCollectionAndAFileEntry();

        expect(await collection.find()).toEqual([dataEntry]);
      });

      test("multi collection support", async () => {
        const {
          database,
          collection: files,
        } = await createDatabaseWithMemoryStorageAndFilesCollection();

        await database.createCollection("documents");
        const documents = (await database.getCollection("documents"))!;

        const dataEntry = createData();
        await files.insert(dataEntry);

        expect(await documents.find()).toEqual([]);
      });
    });
  });

  describe("persistence", () => {
    test("using data from storage", async () => {
      const {
        storage,
        dataEntry,
      } = await createDatabaseWithMemoryStorageAndFilesCollectionAndAFileEntry();

      const database2 = createDatabase(storage);
      database2.createCollection("files");
      const collection2 = (await database2.getCollection("files"))!;

      const result = await collection2.find();
      expect(result).toEqual([dataEntry]);
    });
  });
});

function createDatabaseWithMemoryStorage(): {
  database: Database;
  storage: MemoryStorage;
} {
  const storage = new MemoryStorage();
  const database = createDatabase(storage);
  return { database, storage };
}

async function createDatabaseWithMemoryStorageAndFilesCollection(): Promise<{
  database: Database;
  storage: MemoryStorage;
  collection: ICollection;
}> {
  const { database, storage } = createDatabaseWithMemoryStorage();
  await database.createCollection("files");
  const collection = (await database.getCollection("files"))!;
  return { database, storage, collection };
}

async function createDatabaseWithMemoryStorageAndFilesCollectionAndAFileEntry(): Promise<{
  database: Database;
  storage: MemoryStorage;
  collection: ICollection;
  dataEntry: any;
}> {
  const {
    database,
    storage,
    collection,
  } = await createDatabaseWithMemoryStorageAndFilesCollection();

  const dataEntry = createData();
  await collection.insert(dataEntry);

  return { database, storage, collection, dataEntry };
}
