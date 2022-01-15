export function resolveOrderCompare(a, b) {
    return b.dependsOnCompletionOf(a) ? -1 : (a.dependsOnCompletionOf(b) ? 1 : 0);
}
//# sourceMappingURL=resolveOrderCompare.js.map