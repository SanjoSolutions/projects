"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = void 0;
function binarySearch(list, compareFn, value) {
    let subList = list;
    let index;
    while (subList.length >= 1) {
        index = Math.floor(subList.length / 2);
        const valueAtIndex = subList[index];
        const compareResult = compareFn(value, valueAtIndex);
        if (compareResult === 0) {
            return { index, value: valueAtIndex };
        }
        else if (compareResult < 0) {
            subList = subList.slice(0, index);
        }
        else {
            subList = subList.slice(index + 1);
        }
    }
    return {
        index: -1,
        value: null,
    };
}
exports.binarySearch = binarySearch;
//# sourceMappingURL=binarySearch.js.map