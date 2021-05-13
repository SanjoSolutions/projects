import { putOut, putIn } from "./array.js";

export interface IInventory {
  putOut(indexes: number[]): any[];
  putIn(items: any[]): void;
}

export class Inventory implements IInventory {
  items: any[];

  constructor() {
    this.items = [];
  }

  putOut(indexes) {
    const [putOutItems, items] = putOut(this.items, indexes);
    this.items = items;
    return putOutItems;
  }

  putIn(items) {
    putIn(this.items, items);
  }
}
