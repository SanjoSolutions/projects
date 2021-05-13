import { Inventory } from "./Inventory.js";

export interface ITrader {
    inventory: Inventory
}

export class Trader implements ITrader {
    inventory: Inventory

    constructor() {
        this.inventory = new Inventory()
    }
}
