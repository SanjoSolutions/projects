import { putOut, putIn } from './array.js';
export class Inventory {
    items;
    constructor() {
        this.items = [];
    }
    putOut(indexes) {
        const [putOutItems, items] = putOut(this.items, indexes);
        this.items = items;
        return putOutItems;
    }
    putIn(items) {
        putIn(this.items, items);
    }
}
//# sourceMappingURL=Inventory.js.map