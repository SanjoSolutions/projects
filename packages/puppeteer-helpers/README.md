# @sanjo/puppeteer-helpers

Puppeteer helpers.

## How to install

```
npm install --save '@sanjo/puppeteer-helpers'
```

## How to use

```js
import {
  waitForNavigation,
  withWaitForNavigation
} from '@sanjo/puppeteer-helpers'

await waitForNavigation(page)

await withWaitForNavigation(
  page,
  page.click('#button')
)
```
