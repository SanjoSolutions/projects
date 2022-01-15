import { resolveOrderCompare } from './resolveOrderCompare.js';
export function resolveOrder(tasks) {
    const order = Array.from(tasks);
    order.sort(resolveOrderCompare);
    return order;
}
//# sourceMappingURL=resolveOrder.js.map