export class Task {
  #name: string
  #options: TaskOptions

  constructor(name: string, options: TaskOptions) {
    this.#name = name
    this.#options = options
  }

  get priority() {
    return this.#options.priority
  }
}

interface TaskOptions {
  priority: number // [1;100]. 1 highest priority.
}
