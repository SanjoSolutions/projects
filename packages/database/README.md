# @sanjo/database

This work is devoted to God.

Database.

## How to install

```
npm install --save '@sanjo/database'
```

## How to use

```js
import { Database, InMemoryFileSystem } from "@sanjo/database";

const fileSystem = new InMemoryFileSystem();
const storeFilePath = "store.json";
const database = new Database(storeFilePath, fileSystem);
```
