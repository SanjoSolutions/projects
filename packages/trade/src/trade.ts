import { ITrader } from "./Trader.js";

export function trade(
  traderA: ITrader,
  traderB: ITrader,
  inventoryItemIndexesToTradeA,
  inventoryItemIndexesToTradeB
) {
  const inventoryItemsToTradeA = traderA.inventory.putOut(
    inventoryItemIndexesToTradeA
  );
  const inventoryItemsToTradeB = traderB.inventory.putOut(
    inventoryItemIndexesToTradeB
  );
  traderA.inventory.putIn(inventoryItemsToTradeB);
  traderB.inventory.putIn(inventoryItemsToTradeA);
}
