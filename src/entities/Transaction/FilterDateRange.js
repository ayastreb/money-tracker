import subDays from 'date-fns/sub_days'
import startOfToday from 'date-fns/start_of_today'
import endOfToday from 'date-fns/end_of_today'
import startOfYesterday from 'date-fns/start_of_yesterday'
import endOfYesterday from 'date-fns/end_of_yesterday'
import startOfMonth from 'date-fns/start_of_month'

const daysFromToday = days => () => subDays(startOfToday(), days)
const lastWeek = daysFromToday(7)
const lastMonth = daysFromToday(30)
const firstDayOfThisMonth = () => {
  const date = new Date()
  return startOfMonth(date)
}

const ranges = {
  today: {
    label: 'Today',
    start: startOfToday,
    end: endOfToday
  },
  yesterday: {
    label: 'Yesterday',
    start: startOfYesterday,
    end: endOfYesterday
  },
  lastWeek: {
    label: 'Last 7 days',
    start: lastWeek,
    end: endOfToday
  },
  lastMonth: {
    label: 'Last 30 days',
    start: lastMonth,
    end: endOfToday
  },
  thisMonth: {
    label: 'This month',
    start: firstDayOfThisMonth,
    end: endOfToday
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
