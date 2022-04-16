/**
 * @see https://en.wikipedia.org/wiki/Cartesian_product
 */
export function cartesianProduct(setA, setB) {
    const result = new Set();
    for (const elementA of setA) {
        for (const elementB of setB) {
            result.add([elementA, elementB]);
        }
    }
    return result;
}
//# sourceMappingURL=cartesianProduct.js.map