describe('user events', () => {
  it('mapping user events', () => {
    const sideEffect = jest.fn(() => {
      events.push({ type: 'DataFetchEvent', data: { text: 'hi' } })
    })

    // user event --> user interface
    const events = [
      { type: 'MouseDownEvent' },
      { type: 'MouseUpEvent' },
    ]

    function processEvents (events) {
      events.reduce((_, event) => {
        if (event.type === 'MouseUpEvent') {
          sideEffect()
        }
      }, {})

      return renderUserInterface(events)
    }

    function renderUserInterface (events) {
      return events.reduce((_, event) => {
        if (event.type === 'MouseDownEvent') {
          return '<button class="button button--pressed"></button>'
        } else {
          return '<button class="button"></button>'
        }
      }, {})
    }

    expect(processEvents(events))
      .toEqual('<button class="button"></button>')
    expect(sideEffect).toHaveBeenCalled()
    expect(events).toContainEqual({ type: 'DataFetchEvent', data: { text: 'hi' } })
  })
})
