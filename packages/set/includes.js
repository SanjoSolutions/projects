import { intersection } from './intersection.js';
export function includes(setA, setB) {
    return intersection(setA, setB).size === setB.size;
}
//# sourceMappingURL=includes.js.map