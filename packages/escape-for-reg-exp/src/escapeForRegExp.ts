/**
 * @see https://github.com/tc39/proposal-regex-escaping/blob/ee2525eaa9746379d8efb70dda4fa18ccb2bfba8/polyfill.js
 */
export function escapeForRegExp(text: string): string {
  return String(text).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')
}
