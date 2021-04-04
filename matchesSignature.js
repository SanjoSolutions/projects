import { includes } from "./packages/set/built/index.js";

export function matchesSignature(object, keys) {
  keys = new Set(keys);
  return includes(new Set(Object.keys(object)), keys);
}
