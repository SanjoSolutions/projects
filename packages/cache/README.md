# @sanjo/cache

This work is devoted to God.

## Available caches

* Cache: a cache which supports any type as a key.
* ObjectCache: a cache which supports objects with the same properties as key.

Also provides the function `createCachingFunction` which
can create a function out of a function, which caches its results.

## How to install

```
npm install --save '@sanjo/cache'
```

## How to use

Please see specifications ([Cache](./src/Cache.spec.ts),
[ObjectCache](./src/ObjectCache.spec.ts),
[createCachingFunction](./src/createCachingFunction.spec.ts)).
