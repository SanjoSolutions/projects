jest.mock('@sanjo/request')

import { beforeEach, describe, expect, it, jest, test } from '@jest/globals'
import request from '@sanjo/request'
import { requestJSON } from './requestJSON.js'

describe('requestJSON', () => {
  beforeEach(function () {
    ;(request as jest.Mock).mockResolvedValue({
      status: 200,
      responseType: 'application/json',
      body: '{}',
    })
  })

  it('returns the JSON from a URL', async () => {
    const url = 'http://www.example.com'
    const json = await requestJSON(url)
    expect(json).toEqual({})
  })

  test('posting JSON', async () => {
    const url = 'http://www.example.com'
    const options = {
      method: 'POST',
    }
    const data = {
      id: 1,
    }
    await requestJSON(url, { ...options }, data)
    expect(request).toHaveBeenCalledWith(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
      '{"id":1}'
    )
  })
})
