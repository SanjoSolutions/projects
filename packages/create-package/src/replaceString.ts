import escapeForRegExp from "@sanjo/escape-for-reg-exp";

export function replaceString(
  text: string,
  stringToReplace: string,
  stringToReplaceWith: string
): string {
  return text.replace(
    new RegExp(escapeForRegExp(stringToReplace), "g"),
    stringToReplaceWith
  );
}
