export class Task {
    _dependsOnCompletionOf = new Set();
    declareThatTaskDependsOnCompletionOf(task) {
        this._dependsOnCompletionOf.add(task);
    }
    getTasksItDependsOnCompletionOf() {
        return new Set(this._dependsOnCompletionOf);
    }
    dependsOnCompletionOf(task) {
        return this._dependsOnCompletionOf.has(task);
    }
}
//# sourceMappingURL=Task.js.map