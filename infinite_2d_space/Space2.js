export class Space {
  constructor() {
    this.data = new Map();
  }

  get({ x, y }) {
    return Boolean(this.data.get(y)?.has(x));
  }

  set({ x, y }) {
    let lookup = this.data.get(y);
    if (!lookup) {
      lookup = new Set();
      this.data.set(y, lookup);
    }
    lookup.add(x);
  }
}
