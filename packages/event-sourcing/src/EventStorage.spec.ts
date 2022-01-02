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
    console.log((fs.writeFile as jest.Mock).mock.calls.length)
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
