export function cartesianProduct(setA, setB) {
    const result = new Set();
    setA.forEach(valueA => setB.forEach(valueB => result.add([valueA, valueB])));
    return result;
}
//# sourceMappingURL=cartesianProduct.js.map