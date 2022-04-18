# @sanjo/webpack

This work is devoted to God.

Webpack configurations.

## How to install

```
npm install --save-dev '@sanjo/webpack'
```

## How to use

Add to your `package.json`:

```json
{
  "scripts": {
    "build": "webpack --config node_modules/@sanjo/webpack/webpack.prod.js",
    "build:watch": "webpack serve --open --config node_modules/@sanjo/webpack/webpack.dev.js"
  },
  "devDependencies": {
    "@sanjo/webpack": "^2.0.1",
    "@webpack-cli/serve": "^1.6.0",
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.7.2"
  }
}
```
