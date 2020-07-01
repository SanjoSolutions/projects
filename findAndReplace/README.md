# Find and replace

Finds and replaces string values in XML and Java files and replaces them with string references.
See spec.pdf and the .spec.js files for more implementation details.

## How to run

```
node --experimental-modules src/index.js data/example/config.json
```

The first argument is the path to the config.json.

The error.csv is created in the current working directory.

## Development

This project uses the [Standard style guide](https://standardjs.com/).

### Setup

Node.js 12 required.

```
npm install
```

### How to run unit tests

```
npm test
```
