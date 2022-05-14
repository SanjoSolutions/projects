# @sanjo/feature-flags

This work is devoted to God.

Feature flags.

## How to install

```
npm install --save '@sanjo/feature-flags'
```

## How to use

```js
import { FeatureFlags } from '@sanjo/feature-flags'

const featureFlags = new FeatureFlags({
  featureFlag1: true,
  featureFlag2: false,
})

featureFlags.isEnabled('featureFlag1') // true
featureFlags.isDisabled('featureFlag2') // true
featureFlags.toObject() // { featureFlag1: true, featureFlag2: false }
```
