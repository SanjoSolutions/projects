import { describe, expect, it, jest } from '@jest/globals'
import fs from 'fs/promises'
import { EventStorage } from './EventStorage.js'

declare module 'expect/build/types.js' {
  interface Matchers<R> {
    toHaveBeenStoredIn(eventStorage: EventStorage): R

    toHaveBeenStoredOnDisk(): R
  }
}
expect.extend({
  toHaveBeenStoredIn(event: any, eventStorage: EventStorage) {
    const hasBeenStoredInEventStorage = eventStorage.events.includes(event)
    return {
      pass: hasBeenStoredInEventStorage,
      message() {
        return 'It seems that the event storage does not include the event.'
      },
    }
  },

  toHaveBeenStoredOnDisk(event: any) {
    return {
      pass: (fs.writeFile as jest.Mock).mock.calls.length >= 1,
      message() {
        return 'It seems that the event has not been stored on disk.'
      },
    }
  },
})

const fileName = 'a.json'

describe('EventStorage', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readFile').mockRejectedValue({
      code: 'ENOENT',
    })
    jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined)
  })

  describe('constructor', () => {
    it('accepts a file name for persistence', () => {
      const eventStorage = new EventStorage(fileName)
      expect(eventStorage._fileName).toEqual(fileName)
    })
  })

  describe('initialisation', () => {
    it('loads events from disk', async () => {
      const eventStorage = new EventStorage(fileName)
      ;(fs.readFile as jest.Mock).mockResolvedValue('[{}]')
      await eventStorage.initialize()
      expect(eventStorage.retrieve()).toEqual([{}])
    })

    describe('when the file does not exist', () => {
      it('initializes the store with an empty list', async () => {
        const eventStorage = new EventStorage(fileName)
        await eventStorage.initialize()
        expect(eventStorage.retrieve()).toEqual([])
      })
    })
  })

  describe('store', () => {
    it('saves the event in memory', async () => {
      const eventStorage = new EventStorage(fileName)
      await eventStorage.initialize()
      const event = {}
      await eventStorage.store(event)
      expect(event).toHaveBeenStoredIn(eventStorage)
    })

    it('saves the event to disk', async () => {
      const eventStorage = new EventStorage(fileName)
      await eventStorage.initialize()
      const event = {}
      await eventStorage.store(event)
      expect(event).toHaveBeenStoredOnDisk()
    })

    describe('when it is called before initialize', () => {
      it('throws an error', async () => {
        const eventStorage = new EventStorage(fileName)
        const event = {}
        await expect(() => eventStorage.store(event)).rejects.toThrow(
          'Please call initialize() before calling store().'
        )
      })
    })
  })

  describe('retrieve', () => {
    it('returns all events', async () => {
      const eventStorage = new EventStorage(fileName)
      await eventStorage.initialize()
      const event = {}
      eventStorage.store(event)
      const events = eventStorage.retrieve()
      expect(events).toEqual([event])
    })

    it('returns a copy of the list of events', async () => {
      const eventStorage = new EventStorage(fileName)
      await eventStorage.initialize()
      const event = {}
      eventStorage.store(event)
      const events = eventStorage.retrieve()

      const event2 = {}
      events.push(event2)

      const events2 = eventStorage.retrieve()
      expect(events2).toEqual([event])
    })

    describe('when it is called before initialize', () => {
      it('throws an error', async () => {
        const eventStorage = new EventStorage(fileName)
        expect(() => eventStorage.retrieve()).toThrow('Please call initialize() before calling retrieve().')
      })
    })
  })
})

describe('', () => {
  test('', () => {
    const events = [
      {
        type: 'deposit',
        to: 'a',
        amount: 10,
      },
      {
        type: 'transfer',
        from: 'a',
        to: 'b',
        amount: 10,
      },
    ]
    const balanceA = determineBalance(events, 'a')
    const balanceB = determineBalance(events, 'b')

    expect(balanceA).toEqual(0)
    expect(balanceB).toEqual(10)
  })
})

describe('updating of balance', () => {
  it('updates the balance when a event is added which changes the balance', () => {
    const events: any[] = []

    const balanceA = balance(events, 'a')

    events.push({
      type: 'deposit',
      to: 'a',
      amount: 10,
    })

    expect(balanceA.get()).toEqual(10)
  })

  it('updates the balance when a event is added which changes the balance', () => {
    const events: any[] = []

    const balanceA = balance(events, 'a')

    events.push({
      type: 'deposit',
      to: 'a',
      amount: 11,
    })

    expect(balanceA.get()).toEqual(11)
  })

  it('updates the balance when a event is added which changes the balance', () => {
    const events: any[] = []

    const balanceA = balance(events, 'a')

    events.push({
      type: 'deposit',
      to: 'a',
      amount: 11,
    })

    expect(balanceA.get()).toEqual(11)

    events.push({
      type: 'transfer',
      from: 'a',
      to: 'b',
      amount: 10,
    })

    expect(balanceA.get()).toEqual(1)
  })
})

describe('balance', () => {
  it('returns a default balance of 0', () => {
    const events: any[] = []

    const balanceA = balance(events, 'a')

    expect(balanceA.get()).toEqual(0)
  })
})

function balance(events: any[], accountId: string): { get: () => number } {
  return value<number>(events, (events, lastValue) => determineBalance(events, accountId, lastValue))
}

function value<T>(events: any[], determineValue: (events: any[], lastValue: T | undefined) => T): { get: () => T } {
  let lastEventIndexProcessed = -1
  let lastValue: T | undefined = undefined
  return {
    get() {
      const eventsToProcess = events.slice(lastEventIndexProcessed + 1)
      const value = determineValue(eventsToProcess, lastValue)
      lastEventIndexProcessed = events.length - 1
      lastValue = value
      return value
    },
  }
}

function determineBalance(events: any[], accountId: string, balance: number = 0): number {
  return events.reduce((balance, event) => {
    if (event.type === 'deposit' && event.to === accountId) {
      return balance + event.amount
    } else if (event.type === 'transfer' && event.from === accountId) {
      return balance - event.amount
    } else if (event.type === 'transfer' && event.to === accountId) {
      return balance + event.amount
    } else {
      return balance
    }
  }, balance)
}
