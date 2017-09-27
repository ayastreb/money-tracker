import subDays from 'date-fns/sub_days'

const today = () => new Date().setHours(0, 0, 0)
const todayEnd = () => new Date().setHours(23, 59, 59)
const daysFromToday = days => () => subDays(today(), days).getTime()
const yesterday = daysFromToday(1)
const lastWeek = daysFromToday(7)
const lastMonth = daysFromToday(30)
const firstDayOfThisMonth = () => {
  const date = new Date()
  date.setDate(1)
  return date.setHours(0, 0, 0)
}

const ranges = {
  today: {
    label: 'Today',
    start: today,
    end: todayEnd
  },
  yesterday: {
    label: 'Yesterday',
    start: yesterday,
    end: yesterday
  },
  lastWeek: {
    label: 'Last 7 days',
    start: lastWeek,
    end: todayEnd
  },
  lastMonth: {
    label: 'Last 30 days',
    start: lastMonth,
    end: todayEnd
  },
  thisMonth: {
    label: 'This month',
    start: firstDayOfThisMonth,
    end: todayEnd
  },
  custom: {
    label: 'Custom date'
  }
}

const DateRange = {
  defaultRange: 'lastWeek',
  defaultStart: ranges.lastWeek.start(),
  defaultEnd: ranges.lastWeek.end(),
  rangeStart(key) {
    return ranges[key].start && ranges[key].start()
  },
  rangeEnd(key) {
    return ranges[key].end && ranges[key].end()
  },
  options() {
    return Object.keys(ranges).map(key => ({
      key,
      value: key,
      text: `${ranges[key].label}`
    }))
  }
}

export default DateRange
