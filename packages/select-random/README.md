# @sanjo/select-random

This work is devoted to God.

A function that randomly selects a value based on a given probability distribution.

## How to install

```
npm install --save '@sanjo/select-random'
```

## How to use

```js
import { selectRandom } from "@sanjo/select-random"

console.log(
  selectRandom(
    new Map([
      ["a", 0.5],
      ["b", 0.5],
    ]),
  ),
)
```
