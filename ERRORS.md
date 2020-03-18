(node:21380) UnhandledPromiseRejectionWarning: Error: Error: failed to find element matching selector ".filtered-count"
    at ElementHandle.$eval (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/JSHandle.js:504:13)
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async getInnerTextOfChild (/Users/self/Documents/automatic_application_for_flats/dist/lib/getInnerTextOfChild.js:11:10)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/getInnerTextOfChild.js:4:10
    at async GewobagFlatOfferListPage.getInnerText (/Users/self/Documents/automatic_application_for_flats/dist/lib/Page.js:18:12)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/Page.js:10:12
    at async GewobagFlatOfferListPage.getNumberOfResults (/Users/self/Documents/automatic_application_for_flats/dist/modules/gewobag/GewobagFlatOfferListPage.js:22:22)
        -> /Users/self/Documents/automatic_application_for_flats/src/modules/gewobag/GewobagFlatOfferListPage.js:13:21
    at async fetchOnce (/Users/self/Documents/automatic_application_for_flats/dist/lib/createFetchOnce.js:23:29)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/createFetchOnce.js:15:29
    at async fetch (/Users/self/Documents/automatic_application_for_flats/dist/lib/createFetch.js:17:7)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/createFetch.js:10:7
  -- ASYNC --
    at ElementHandle.<anonymous> (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/helper.js:111:15)
    at DOMWorld.$eval (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/DOMWorld.js:156:21)
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async getInnerTextOfChild (/Users/self/Documents/automatic_application_for_flats/dist/lib/getInnerTextOfChild.js:11:10)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/getInnerTextOfChild.js:4:10
    at async GewobagFlatOfferListPage.getInnerText (/Users/self/Documents/automatic_application_for_flats/dist/lib/Page.js:18:12)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/Page.js:10:12
    at async GewobagFlatOfferListPage.getNumberOfResults (/Users/self/Documents/automatic_application_for_flats/dist/modules/gewobag/GewobagFlatOfferListPage.js:22:22)
        -> /Users/self/Documents/automatic_application_for_flats/src/modules/gewobag/GewobagFlatOfferListPage.js:13:21
    at async fetchOnce (/Users/self/Documents/automatic_application_for_flats/dist/lib/createFetchOnce.js:23:29)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/createFetchOnce.js:15:29
    at async fetch (/Users/self/Documents/automatic_application_for_flats/dist/lib/createFetch.js:17:7)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/createFetch.js:10:7
  -- ASYNC --
    at Frame.<anonymous> (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/helper.js:111:15)
    at Page.$eval (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/Page.js:345:29)
    at Page.<anonymous> (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/helper.js:112:23)
    at getInnerTextOfChild (/Users/self/Documents/automatic_application_for_flats/dist/lib/getInnerTextOfChild.js:11:30)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/getInnerTextOfChild.js:4:30
    at GewobagFlatOfferListPage.getInnerText (/Users/self/Documents/automatic_application_for_flats/dist/lib/Page.js:18:63)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/Page.js:10:18
    at GewobagFlatOfferListPage.getNumberOfResults (/Users/self/Documents/automatic_application_for_flats/dist/modules/gewobag/GewobagFlatOfferListPage.js:22:33)
        -> /Users/self/Documents/automatic_application_for_flats/src/modules/gewobag/GewobagFlatOfferListPage.js:13:32
    at fetchOnce (/Users/self/Documents/automatic_application_for_flats/dist/lib/createFetchOnce.js:23:53)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/createFetchOnce.js:15:53
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async fetch (/Users/self/Documents/automatic_application_for_flats/dist/lib/createFetch.js:17:7)
        -> /Users/self/Documents/automatic_application_for_flats/src/lib/createFetch.js:10:7
(node:21380) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:21380) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.


