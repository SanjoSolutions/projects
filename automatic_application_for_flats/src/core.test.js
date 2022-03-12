import { describe, it, test, expect, jest, afterEach, beforeEach } from '@jest/globals'
import { kommtInFrage } from './core.js'
import { contactData } from './config.js'

describe('core', () => {
  describe('kommtInFrage', () => {
    test('', () => {
      const flatOffer = {
        url: 'https://immosuche.degewo.de/de/properties/W1400-40102-1300-1708',
        coldRent: 219.3,
        coldServiceCharges: 66.97,
        warmServiceCharges: 24.38,
        serviceCharges: null,
        warmRent: null,
        area: 30.29,
        numberOfRooms: 1,
        seniorsOnly: false,
        requiredMinimumAge: null,
        selfRenovation: null,
        wbs: false,
      }
      expect(kommtInFrage(contactData, flatOffer)).toEqual(true)
    })
  })
})
