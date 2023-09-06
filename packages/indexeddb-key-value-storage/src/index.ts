export interface Options {
  objectStoreName: string;
}

export class Database {
  #databaseName: string;
  #options: Options;
  #database: IDBDatabase | null = null;

  constructor(
    databaseName: string,
    options: Options = { objectStoreName: "values" }
  ) {
    this.#databaseName = databaseName;
    this.#options = options;
  }

  async open(): Promise<void> {
    if (!this.#database) {
      this.#database = await openDatabase(this.#databaseName, this.#options);
    }
  }

  async save(key: string, value: any): Promise<void> {
    this.checkIfDatabaseHasBeenOpened();
    const transaction = this.#database!.transaction(
      this.#options.objectStoreName,
      "readwrite"
    );
    const objectStore = transaction.objectStore(this.#options.objectStoreName);
    await convertRequestToPromise(
      objectStore.put({
        key,
        value,
      })
    );
  }

  async load(key: string): Promise<any> {
    this.checkIfDatabaseHasBeenOpened();
    const transaction = this.#database!.transaction(
      this.#options.objectStoreName,
      "readonly"
    );
    const objectStore = transaction.objectStore(this.#options.objectStoreName);
    const object = await convertRequestToPromise(objectStore.get(key));
    return object?.value ?? null;
  }

  private checkIfDatabaseHasBeenOpened() {
    if (!this.#database) {
      throw new Error(
        "Please open the database with `await database.open()` before calling this method."
      );
    }
  }
}

async function convertRequestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, onError) => {
    request.addEventListener("success", function (event) {
      resolve((event.target as any).result);
    });
    request.addEventListener("error", function (event) {
      onError(event);
    });
  });
}

async function openDatabase(
  databaseName: string,
  options: Options
): Promise<IDBDatabase> {
  return new Promise((resolve, onError) => {
    const request = window.indexedDB.open(databaseName);
    request.onupgradeneeded = function (event) {
      const database = (event.target as any).result;
      database.createObjectStore(options.objectStoreName || "values", {
        keyPath: "key",
      });
    };
    request.onerror = function (event) {
      console.error(event);
      onError(event);
    };
    request.onsuccess = function (event) {
      const database = (event.target as any).result;
      resolve(database);
    };
  });
}
