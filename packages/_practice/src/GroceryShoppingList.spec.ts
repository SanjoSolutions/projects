import { describe, it, expect } from "@jest/globals"

class GroceryShoppingList {
  private items: GroceryItem[]

  constructor() {
    this.items = []
  }

  store(groceryItem: GroceryItem): void {
    this.items.push(groceryItem)
  }

  getGroceryItems(): GroceryItem[] {
    return this.items
  }
}

interface GroceryItem {
  groceryItemName: string
  amount: number
  shopName: string
}

describe("GroceryShoppingList", () => {
  it("stores items to buy in grocery stores", () => {
    const groceryShoppingList = new GroceryShoppingList()
    const groceryItem1 = {
      groceryItemName: "Spaghetti",
      amount: 2,
      shopName: "Lidl",
    }
    groceryShoppingList.store(groceryItem1)
    const groceryItem2 = {
      groceryItemName: "Schokolade",
      amount: 1,
      shopName: "Lidl",
    }
    groceryShoppingList.store(groceryItem2)
    expect(groceryShoppingList.getGroceryItems()).toEqual([
      groceryItem1,
      groceryItem2,
    ])
  })
})
