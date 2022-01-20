export class Multiset {
  _elements: Map<any, number> = new Map()

  add(value: any): void {
    if (this._elements.has(value)) {
      this._elements.set(value, this._elements.get(value)! + 1)
    } else {
      this._elements.set(value, 1)
    }
  }

  has(value: any): boolean {
    return this._elements.has(value)
  }

  remove(value: any): void {
    if (this._elements.has(value)) {
      const count = this.count(value)
      if (count > 1) {
        this._elements.set(value, count - 1)
      } else {
        this._elements.delete(value)
      }
    }
  }

  count(value: any): number {
    if (this._elements.has(value)) {
      return this._elements.get(value)!
    } else {
      return 0
    }
  }
}
