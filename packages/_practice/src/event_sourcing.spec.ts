export {}

function eventWasOnDate (date: Date): ({ date }: { date: Date }) => boolean {
  return ({ date: eventDate }) => (
    eventDate.getDate() === date.getDate() &&
    eventDate.getMonth() === date.getMonth() &&
    eventDate.getFullYear() === date.getFullYear()
  )
}

function filter (fn: (
  value: any,
  index: number,
  array: any[],
) => any): (array: any[]) => any[] {
  return (array: any[]) => array.filter(fn)
}

function count (array: any[]): number {
  return array.reduce(incrementBy(1), 0)
}

function incrementBy (incrementor: number): (number: number) => number {
  return (number) => number + incrementor
}

function passValueToFunction (value: any, fn: Function): any {
  return fn(value)
}

function pipe (value: any, ...functions: Function[]): any {
  return functions.reduce(passValueToFunction, value)
}

interface EventSourcingEvent {
  what: string
  date: Date
}

describe('Event Sourcing', () => {
  it('doggy walking tracking', () => {
    const events: EventSourcingEvent[] = [
      { what: 'Doggy walking', date: new Date('2020-06-01 09:00') },
      { what: 'Doggy walking', date: new Date('2020-06-01 21:00') },
      { what: 'Doggy walking', date: new Date('2020-06-02 09:01') },
    ]

    function howOftenWalkedDoggy (events: EventSourcingEvent[], date: Date) {
      return pipe(events, filter(eventWasOnDate(date)), count)
    }

    expect(howOftenWalkedDoggy(events, new Date('2020-06-01'))).toEqual(2)
  })
})
