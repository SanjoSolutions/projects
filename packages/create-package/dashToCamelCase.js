export function dashToCamelCase(string) {
    const parts = string.split("-");
    return [parts[0]]
        .concat(parts
        .slice(1)
        .map((string) => string[0].toUpperCase() + string.substring(1)))
        .join("");
}
//# sourceMappingURL=dashToCamelCase.js.map