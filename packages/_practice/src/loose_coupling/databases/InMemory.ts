export class InMemory {
  private _collection: any[] = []

  save(model: any): void {
    this._collection.push(model)
  }

  find(): any[] {
    return this._collection
  }
}
