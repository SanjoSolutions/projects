import { describe, it, expect } from '@jest/globals'

interface WorkTime {
  start: Date
  end: Date
}

type TimeSpan = number // in ms
type HourlyRate = number
type Money = number

class MoneyMaker {
  private _stopClock: IStopClock
  private _workTimes: WorkTime[]
  private _hourlyRate: HourlyRate

  constructor(stopClock: IStopClock) {
    this._stopClock = stopClock
    this._workTimes = []
    this._hourlyRate = 0
  }

  setHourlyRate(hourlyRate: HourlyRate): void {
    this._hourlyRate = hourlyRate
  }

  startWorking(): void {
    this._stopClock.start()
  }

  stopWorking(): void {
    const workTime = this._stopClock.stop()
    this._workTimes.push(workTime)
  }

  getMoneyEarned(): Money {
    return calculateMoneyEarnedFromWorkTimes(this._workTimes, this._hourlyRate)
  }
}

interface IStopClock {
  start: () => void
  stop: () => WorkTime
}

class StopClock implements IStopClock {
  private stoppedTime: { start: Date; end?: Date } | null

  constructor() {
    this.stoppedTime = null
  }

  start() {
    this.stoppedTime = { start: new Date() }
  }

  stop(): WorkTime {
    if (!this.stoppedTime) {
      throw new Error('Stop clock has not been started yet.')
    }
    this.stoppedTime.end = new Date()
    return this.stoppedTime as WorkTime
  }
}

class StopClockMock implements IStopClock {
  private _workTimes: WorkTime[]
  private _currentWorkTimeIndex: number

  constructor(workTimes: WorkTime[]) {
    this._workTimes = workTimes
    this._currentWorkTimeIndex = -1
  }

  start() {
    this._currentWorkTimeIndex += 1
  }

  stop() {
    return this._workTimes[this._currentWorkTimeIndex]
  }
}

function calculateMoneyEarnedFromWorkTimes(workTimes: WorkTime[], hourlyRate: HourlyRate): Money {
  return calculateMoneyEarned(calculateTimeWorked(workTimes), hourlyRate)
}

function calculateMoneyEarned(timeWorked: number, hourlyRate: HourlyRate): Money {
  return millisecondsToHours(timeWorked * hourlyRate)
}

function calculateTimeWorked(workTimes: WorkTime[]): TimeSpan {
  const timesWorked = workTimes.map(({ start, end }) => calculateTimeSpan(start, end))
  return sum(timesWorked)
}

function millisecondsToHours(milliseconds: TimeSpan): number {
  return milliseconds / 1000 / 60 / 60
}

function calculateTimeSpan(startTime: Date, endTime: Date): TimeSpan {
  return endTime.getTime() - startTime.getTime()
}

function sum(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number)
}

function generateDate(hour: number, minute: number = 0): Date {
  return new Date(`2020-06-30 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
}

describe('MoneyMaker', () => {
  it('makes money', () => {
    const workTimes = [
      {
        start: generateDate(9),
        end: generateDate(12),
      },
      {
        start: generateDate(12, 30),
        end: generateDate(21),
      },
    ]
    const stopClockMock = new StopClockMock(workTimes)
    const moneyMaker = new MoneyMaker(stopClockMock)
    const hourlyRate = 60
    moneyMaker.setHourlyRate(hourlyRate)

    for (let index = 0; index < workTimes.length; index++) {
      moneyMaker.startWorking()
      moneyMaker.stopWorking()
    }

    expect(moneyMaker.getMoneyEarned()).toEqual(calculateMoneyEarnedFromWorkTimes(workTimes, hourlyRate))
  })
})

describe('StopClock', () => {
  describe('when stop clock is stopped before it has been started', () => {
    it('throws an error', () => {
      const stopClock = new StopClock()
      expect(() => stopClock.stop()).toThrowError('Stop clock has not been started yet.')
    })
  })
})
