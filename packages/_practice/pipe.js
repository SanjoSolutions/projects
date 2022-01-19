function passValueToFunction(value, fn) {
    return fn(value);
}
export function pipe(value, ...functions) {
    return functions.reduce(passValueToFunction, value);
}
//# sourceMappingURL=pipe.js.map