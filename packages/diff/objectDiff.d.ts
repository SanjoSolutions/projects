import { KeyPath } from './KeyPath.js';
import { ObjectOperation } from './ObjectOperation.js';
export declare type ObjectDiff = ObjectOperation[];
export declare function objectDiff(fromObject: {
    [key: string]: any;
}, toObject: {
    [key: string]: any;
}, keyPath?: KeyPath): ObjectDiff;
//# sourceMappingURL=objectDiff.d.ts.map