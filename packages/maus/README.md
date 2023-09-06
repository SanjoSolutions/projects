# @sanjo/maus

This work is devoted to God.

Subscribable mouse events.

## How to install

```
npm install --save '@sanjo/maus'
```

## How to use

```js
import { Maus } from "@sanjo/maus"

const maus = new Maus()
maus.listen()

maus.onPrimaryClick(function () {
  console.log("primary click")
})
```
