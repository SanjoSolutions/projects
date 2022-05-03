export function flat(set, depth = 1) {
    const array = prepareSetForFlattening(set, depth);
    return new Set(array.flat(depth));
}
function prepareSetForFlattening(set, depth) {
    let arraysWithElementsToPrepare = [Array.from(set)];
    for (let preparationForDepth = 1; preparationForDepth <= depth; preparationForDepth++) {
        arraysWithElementsToPrepare = arraysWithElementsToPrepare.map((elements) => prepareElements(elements));
        arraysWithElementsToPrepare = arraysWithElementsToPrepare[0];
    }
    return arraysWithElementsToPrepare;
}
function prepareElements(elements) {
    return elements.map((element) => element instanceof Set ? Array.from(element) : element);
}
//# sourceMappingURL=flat.js.map