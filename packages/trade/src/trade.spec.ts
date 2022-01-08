import { trade } from './trade.js'
import { Trader } from './Trader.js'

describe('trade', () => {
  it('exchanges items of two traders', () => {
    const traderA = new Trader()
    const traderB = new Trader()
    const itemA = { id: 'itemA' }
    const itemB = { id: 'itemB' }
    traderA.inventory.putIn([itemA])
    traderB.inventory.putIn([itemB])

    trade(traderA, traderB, [0], [0])

    expect(traderA.inventory.items).toEqual([itemB])
    expect(traderB.inventory.items).toEqual([itemA])
  })
})
