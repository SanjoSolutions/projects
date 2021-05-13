import { putOut, putIn } from './array.js'

export class Trader {
    constructor() {
        this.inventory = new Inventory()
    }
}

export class Inventory {
    constructor() {
        this.items = []
    }

    putOut(indexes) {
        const [putOutItems, items] = putOut(this.items, indexes)
        this.items = items
        return putOutItems
    }

    putIn(items) {
        putIn(this.items, items)
    }
}

export function trade(traderA, traderB, inventoryItemIndexesToTradeA, inventoryItemIndexesToTradeB) {
    const inventoryItemsToTradeA = traderA.inventory.putOut(inventoryItemIndexesToTradeA)
    const inventoryItemsToTradeB = traderB.inventory.putOut(inventoryItemIndexesToTradeB)
    traderA.inventory.putIn(inventoryItemsToTradeB)
    traderB.inventory.putIn(inventoryItemsToTradeA)
}
