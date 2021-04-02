export class InMemory {
  constructor() {
    this.collection = []
  }

  save(model) {
    this.collection.push(model)
  }

  find() {
    return this.collection
  }
}
