# @sanjo/is-on-line

This work is devoted to God.

A function that determines if a point is on a line.

## How to install

```
npm install --save '@sanjo/is-on-line'
```

## How to use

```js
import { isOnLine } from "@sanjo/is-on-line"

const line = {
  from: {
    x: 0,
    y: 0,
  },
  to: {
    x: 10,
    y: 0,
  },
}

const point = {
  x: 5,
  y: 0,
}

console.log(isOnLine(line.from, line.to, point))
```
