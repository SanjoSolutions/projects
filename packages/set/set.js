// See: https://en.wikipedia.org/wiki/Set_theory#Basic_concepts_and_notation
export function includes(setA, setB) {
    return intersection(setA, setB).size === setB.size;
}
export function union(setA, setB) {
    const unionSet = new Set();
    for (const value of setA) {
        unionSet.add(value);
    }
    for (const value of setB) {
        unionSet.add(value);
    }
    return unionSet;
}
export function intersection(setA, setB) {
    return new Set([...setA].filter(value => setB.has(value)));
}
export function intersection2(setA, setB) {
    const result = new Set();
    if (setB.size < setA.size) {
        const temp = setA;
        setA = setB;
        setB = temp;
    }
    for (const value of setA) {
        if (setB.has(value)) {
            result.add(value);
        }
    }
    return result;
}
export function copyArray1(array) {
    return [...array];
}
export function copyArray2(array) {
    return Array.from(array);
}
export function difference(setA, setB) {
    const differenceSet = new Set();
    for (const value of setA) {
        if (!setB.has(value)) {
            differenceSet.add(value);
        }
    }
    return differenceSet;
}
export function symmetricDifference(setA, setB) {
    return difference(union(setA, setB), intersection(setA, setB));
}
export function cartesianProduct(setA, setB) {
    const result = new Set();
    setA.forEach(valueA => setB.forEach(valueB => result.add([valueA, valueB])));
    return result;
}
export function powerSet(set) {
    const array = [...set];
    array.sort();
    const indexSubSequences = getIndexSubSequences(array.length);
    const subSequences = indexSubSequences.map(indexSubSequence => indexSubSequence.map(index => array[index]));
    const subSets = subSequences.map(subSequence => new Set(subSequence));
    const result = new Set(subSets);
    return result;
}
function getIndexSubSequences(length) {
    let subSequences = [[]];
    const result = [...subSequences];
    do {
        const nextSubSequences = [];
        for (const subSequence of subSequences) {
            const lastValue = subSequence.length > 0 ? subSequence[subSequence.length - 1] : -1;
            for (let value = lastValue + 1; value < length; value++) {
                nextSubSequences.push([...subSequence, value]);
            }
        }
        result.push(...nextSubSequences);
        subSequences = nextSubSequences;
    } while (subSequences.length > 0);
    return result;
}
//# sourceMappingURL=set.js.map