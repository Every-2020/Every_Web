export default class NewDate {
  constructor (...args) {
    let date
    if (args.length > 1) {
      const [year, month, ...rest] = args
      date = new Date(year, month - 1, ...rest)
    } else {
      date = new Date(...args)
    }
    date.setHours(0, 0, 0, 0)
    this._date = date
  }

  getMonth () {
    return this._date.getMonth() + 1
  }

  getDay () {
    return this._date.getDay() + 1
  }

  getMonthName (mode = 'long') {
    return this._date.toLocaleString('en-US', { month: mode })
  }

  getFullYear () {
    return this._date.getFullYear()
  }

  getDate () {
    return this._date.getDate()
  }

  getTime () {
    return this._date.getTime()
  }

  getDayName (mode = 'long') {
    return this._date.toLocaleString('en-US', { weekday: mode })
  }

  getNextDay () {
    const day = new this.constructor(this.getTime())
    day.setDate(day.getDate() + 1)
    return day
  }

  getPrevDay () {
    const day = new this.constructor(this.getTime())
    day.setDate(day.getDate() - 1)
    return day
  }

  setDate (date) {
    this._date.setDate(date)
    return this.getTime()
  }

  isInRange (start, end, repeat = 'never') {
    const startDate = new this.constructor(start)
    const endDate = new this.constructor(end)
    const currentTime = this.getTime()
    let startTime
    let endTime
    let startCheck
    let endCheck
    switch (repeat) {
      case 'monthly':
        startTime = new this.constructor(
          this.getFullYear(),
          this.getMonth(),
          startDate.getDate()
        ).getTime()
        endTime = new this.constructor(
          this.getFullYear(),
          this.getMonth(),
          endDate.getDate()
        ).getTime()
        startCheck = currentTime >= startTime
        endCheck = currentTime <= endTime
        return startCheck && endCheck

      case 'yearly':
        startTime = new this.constructor(
          this.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ).getTime()
        endTime = new this.constructor(
          this.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        ).getTime()
        startCheck = currentTime >= startTime
        endCheck = currentTime <= endTime
        return startCheck && endCheck

      case 'never':
        startCheck = currentTime >= startDate.getTime()
        endCheck = currentTime <= endDate.getTime()
        return startCheck && endCheck

      default:
        startCheck = currentTime >= startDate.getTime()
        endCheck = currentTime <= endDate.getTime()
        return startCheck && endCheck
    }
  }

  toDateString () {
    return this._date.toDateString()
  }

  toISOString () {
    return this._date.toISOString()
  }

  getTimezoneOffset () {
    return this._date.getTimezoneOffset()
  }

  getNumberOfDaysInMonth () {
    return new this.constructor(
      this.getFullYear(),
      this.getMonth() + 1,
      0
    ).getDate()
  }

  getFirstWeekdayOfMonth () {
    return new this.constructor(this.getFullYear(), this.getMonth(), 1).getDay()
  }
}
