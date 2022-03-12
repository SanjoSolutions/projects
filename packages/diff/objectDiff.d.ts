import type { KeyPath } from './KeyPath.js';
import type { ObjectOperation } from './ObjectOperation.js';
export declare type ObjectDiff = ObjectOperation[];
export declare function objectDiff(fromObject: {
    [key: string]: any;
}, toObject: {
    [key: string]: any;
}, keyPath?: KeyPath): ObjectDiff;
//# sourceMappingURL=objectDiff.d.ts.map