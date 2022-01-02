# @sanjo/event-sourcing

This work is devoted to God.

Event sourcing.

## How to install

```
npm install --save '@sanjo/event-sourcing'
```

## How to use

```js
import { EventStorage } from '@sanjo/event-sourcing'

const eventStorage = new EventStorage()
const event = {}
await eventStorage.store(event)
const events = eventStorage.retrieve()
```
