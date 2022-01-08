import { KeyPath } from './KeyPath.js';
export interface ObjectOperation {
    type: 'add' | 'update' | 'remove';
    key: KeyPath;
    value?: any;
    index?: number;
}
//# sourceMappingURL=ObjectOperation.d.ts.map