export class Task {
  private _dependsOnCompletionOf: Set<Task> = new Set()

  declareThatTaskDependsOnCompletionOf(task: Task) {
    this._dependsOnCompletionOf.add(task)
  }

  getTasksItDependsOnCompletionOf(): any {
    return new Set(this._dependsOnCompletionOf)
  }

  dependsOnCompletionOf(task: Task): boolean {
    return this._dependsOnCompletionOf.has(task)
  }
}
