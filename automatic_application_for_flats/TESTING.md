# Testing

## Testing in browser

```
import { createBrowser } from './lib/createBrowser.js'

let browser

beforeAll(async () => {
  browser = await createBrowser()
})

afterAll(async () => {
  await browser.close()
})
```

## Creating page with HTML

```
import { createPageWithHTML } from './lib/createPageWithHTML.js'

const page = await createPageWithHTML(
  browser,
  `<div class="flat-offer">
        <a href="https://www.example.com/">Link</a>
   </div>`
)
```
