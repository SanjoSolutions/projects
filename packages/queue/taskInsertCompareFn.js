export function taskInsertCompareFn(value, valueAtIndex) {
    const valuePriority = value.priority;
    const valueAtIndexPriority = valueAtIndex.priority;
    return valuePriority <= valueAtIndexPriority ? valuePriority - valueAtIndexPriority : 0;
}
//# sourceMappingURL=taskInsertCompareFn.js.map