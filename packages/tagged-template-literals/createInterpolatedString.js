import { shiftBetween } from './shiftBetween.js';
export function createInterpolatedString(substrings, ...args) {
    return shiftBetween(substrings, args).join('');
}
//# sourceMappingURL=createInterpolatedString.js.map