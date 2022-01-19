import { describe, expect, it } from '@jest/globals'
import { rgbToHsl } from './rgbToHsl.js'

describe('rgbToHsl', () => {
  it('converts RGB to HSL', () => {
    expect(rgbToHsl(0, 0, 255)).toEqual([240 / 360, 1, 0.5])
  })
})
