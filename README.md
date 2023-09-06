This work is devoted to God.

## Projects

[Projects](https://sanjosolutions.github.io/unnamed/)

## Package manager

This repository uses [Yarn](https://yarnpkg.com/getting-started/install).

## Creating a new package

```sh
npm init @sanjo/package '<PACKAGE_NAME>' '<PACKAGE_DESCRIPTION>'
```

E.g.

```sh
npm init @sanjo/package '@sanjo/mathematics' 'Mathematics'
```

### Creating a package for a browser app

```sh
npm init @sanjo/browser-package '<PACKAGE_NAME>' '<PACKAGE_DESCRIPTION>'
```

E.g.

```sh
npm init @sanjo/browser-package '@sanjo/web-app' 'Web app'
```

## Publishing a package

```sh
yarn workspace <PACKAGE_NAME> npm publish
```

E.g.

```sh
yarn workspace @sanjo/mathematics npm publish
```
