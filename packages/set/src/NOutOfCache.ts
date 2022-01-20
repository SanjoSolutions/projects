export class NOutOfCache {
  private _cache = new Map<number, Map<number, number[][]>>()

  has(length: number, n: number): boolean {
    const a = this._cache.get(length)
    if (a) {
      return a.has(n)
    } else {
      return false
    }
  }

  get(length: number, n: number): number[][] | null {
    const a = this._cache.get(length)
    if (a) {
      return a.get(n) ?? null
    } else {
      return null
    }
  }

  set(length: number, n: number, item: number[][]): void {
    let a = this._cache.get(length)
    if (!a) {
      a = new Map<number, number[][]>()
      this._cache.set(length, a)
    }
    a.set(n, item)
  }

  clear(): void {
    this._cache = new Map()
  }
}
