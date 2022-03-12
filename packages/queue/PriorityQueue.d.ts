import type { Task } from './Task.js';
export declare class PriorityQueue {
    #private;
    constructor();
    queueTask(task: Task): void;
    getTask(index: number): Task | null;
    getHighestPriorityTask(): Task | null;
}
//# sourceMappingURL=PriorityQueue.d.ts.map