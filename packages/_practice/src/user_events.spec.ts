import { describe, it, expect, jest } from '@jest/globals'
import { last } from '@sanjo/array'

describe('user events', () => {
  it('mapping user events', () => {
    const sideEffect = jest.fn(() => {
      events.push({ type: 'DataFetchEvent', data: { text: 'hi' } })
    })

    // user event --> user interface
    const events: Event[] = [{ type: 'MouseDownEvent' }, { type: 'MouseUpEvent' }]

    function processEvents(events: Event[]) {
      if (events.some(event => event.type === 'MouseUpEvent')) {
        sideEffect()
      }

      return renderUserInterface(events)
    }

    function renderUserInterface(events: Event[]) {
      const lastEvent = events.length >= 1 ? last(events) : null
      if (lastEvent && lastEvent.type === 'MouseDownEvent') {
        return '<button class="button button--pressed"></button>'
      } else {
        return '<button class="button"></button>'
      }
    }

    expect(processEvents(events)).toEqual('<button class="button"></button>')
    expect(sideEffect).toHaveBeenCalled()
    expect(events).toContainEqual({
      type: 'DataFetchEvent',
      data: { text: 'hi' },
    })
  })
})

interface Event {
  type: string
  data?: any
}
