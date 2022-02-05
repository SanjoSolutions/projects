import { escapeForRegExp } from '@sanjo/escape-for-reg-exp';
export function replaceString(text, stringToReplace, stringToReplaceWith) {
    return text.replace(new RegExp(escapeForRegExp(stringToReplace), 'g'), stringToReplaceWith);
}
//# sourceMappingURL=replaceString.js.map