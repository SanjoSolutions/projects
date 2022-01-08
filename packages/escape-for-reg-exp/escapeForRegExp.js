/**
 * Source: https://stackoverflow.com/a/9310752/759971
 */
export function escapeForRegExp(text) {
  return text.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g, '\\$&')
}
//# sourceMappingURL=escapeForRegExp.js.map
