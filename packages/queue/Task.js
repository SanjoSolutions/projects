export class Task {
    #name;
    #options;
    constructor(name, options) {
        this.#name = name;
        this.#options = options;
    }
    get priority() {
        return this.#options.priority;
    }
}
//# sourceMappingURL=Task.js.map