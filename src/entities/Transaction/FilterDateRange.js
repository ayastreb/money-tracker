import subDays from 'date-fns/sub_days'

const today = () => new Date().setHours(0, 0, 0)
const firstDayOfThisMonth = () => {
  const date = new Date()
  date.setDate(1)
  return date.setHours(0, 0, 0)
}

const ranges = {
  today: {
    label: 'Today',
    start: today,
    end: today
  },
  yesterday: {
    label: 'Yesterday',
    start: () => subDays(today(), 1).getTime(),
    end: () => subDays(today(), 1).getTime()
  },
  last7: {
    label: 'Last 7 days',
    start: () => subDays(today(), 7).getTime(),
    end: today
  },
  last30: {
    label: 'Last 30 days',
    start: () => subDays(today(), 30).getTime(),
    end: today
  },
  thisMonth: {
    label: 'This month',
    start: firstDayOfThisMonth,
    end: today
  },
  custom: {
    label: 'Custom date'
  }
}

const DateRange = {
  defaultRange: 'last7',
  defaultStart: ranges.last7.start(),
  defaultEnd: ranges.last7.end(),
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
