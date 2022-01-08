export function trade(traderA, traderB, inventoryItemIndexesToTradeA, inventoryItemIndexesToTradeB) {
  const inventoryItemsToTradeA = traderA.inventory.putOut(inventoryItemIndexesToTradeA)
  const inventoryItemsToTradeB = traderB.inventory.putOut(inventoryItemIndexesToTradeB)
  traderA.inventory.putIn(inventoryItemsToTradeB)
  traderB.inventory.putIn(inventoryItemsToTradeA)
}
//# sourceMappingURL=trade.js.map
