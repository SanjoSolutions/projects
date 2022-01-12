import binarySearch from '@sanjo/binary-search';
import { taskInsertCompareFn } from './taskInsertCompareFn.js';
export class PriorityQueue {
    #tasks;
    constructor() {
        this.#tasks = [];
    }
    queueTask(task) {
        const { index } = binarySearch(this.#tasks, taskInsertCompareFn, task);
        this.#tasks.splice(index + 1, 0, task);
    }
    getTask(index) {
        return this.#tasks[index] || null;
    }
    getHighestPriorityTask() {
        return this.#tasks[0] || null;
    }
}
//# sourceMappingURL=PriorityQueue.js.map