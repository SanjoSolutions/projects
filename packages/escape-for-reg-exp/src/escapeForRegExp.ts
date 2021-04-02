/**
 * Source: https://stackoverflow.com/a/9310752/759971
 */
export function escapeForRegExp(text: string): string {
  return text.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g, "\\$&")
}
