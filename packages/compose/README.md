# Compose

This work is devoted to God.

Building websites out of layouts, blocks and pages.

## Install

```sh
npm install --save-dev @sanjo/compose
```

## Usage

### Build

```sh
npx compose
```

### Watch Build

```sh
npx compose --watch
```

### Output Path

You can provide an alternative output path with the CLI option `--output <OUTPUT PATH>`.
By default, the output path is the current working directory.

## User Functions

A `compose.user.js` file can be added with exported functions that will be
available in the templates.

To each exported function, a compose object is passed as first argument.

### compose object

You can check out the [example](https://github.com/SanjoSolutions/unnamed/tree/main/packages/compose/example)
to see how the following functions can be used.

#### getPagePath

Returns the path of the page.

#### variables

A map for "variables" for the current page rendering.

#### getVariable

Returns the variable with the given name from the variables.

#### setVariable

Sets the variable with the given name to the given value.

### beforeRender

A function `beforeRender` can be exported from `compose.user.js` that is run by compose before each rendering
of a page.

## Example

[Example](https://github.com/SanjoSolutions/unnamed/tree/main/packages/compose/example)
