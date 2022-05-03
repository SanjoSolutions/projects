export function reduce(set, reducer, initialValue) {
    if (typeof initialValue === "undefined") {
        // @ts-ignore
        return Array.from(set).reduce(reducer);
    }
    else {
        return Array.from(set).reduce(reducer, initialValue);
    }
}
//# sourceMappingURL=reduce.js.map