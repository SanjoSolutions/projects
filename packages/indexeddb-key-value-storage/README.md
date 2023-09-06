# @sanjo/indexeddb-key-value-storage

This work is devoted to God.

A key-value storage implemented with IndexedDB.

## How to install

```
npm install --save '@sanjo/indexeddb-key-value-storage'
```

## How to use

```js
import { Database } from '@sanjo/indexeddb-key-value-storage'

const database = new Database('database-name')
await database.open()
await database.save('key', 'value')
const value = await database.load('key')
```
