import startOfYear from 'date-fns/start_of_year'
import endOfYear from 'date-fns/end_of_year'
import { toUtcTimestamp } from '../util/timezone'

export const REPORT_EXPENSE_INCOME = 'expense_income'
export const REPORT_EXPENSE_TAGS = 'expense_tags'
export const REPORT_NET_WORTH = 'net_worth'
export const REPORT_TIMESPAN_YEARLY = 'yearly'
export const REPORT_TIMESPAN_MONTHLY = 'monthly'

const Report = {
  defaultKind: REPORT_EXPENSE_INCOME,
  defaultTimespan: REPORT_TIMESPAN_YEARLY,
  defaultStartDate() {
    const now = new Date()
    return toUtcTimestamp(startOfYear(now))
  },
  defaultEndDate() {
    const now = new Date()
    return toUtcTimestamp(endOfYear(now))
  },
  kindOptions() {
    return [
      {
        key: REPORT_EXPENSE_INCOME,
        value: REPORT_EXPENSE_INCOME,
        text: 'Expense & Income'
      },
      {
        key: REPORT_EXPENSE_TAGS,
        value: REPORT_EXPENSE_TAGS,
        text: 'Expense by Tags'
      },
      {
        key: REPORT_NET_WORTH,
        value: REPORT_NET_WORTH,
        text: 'Net Worth'
      }
    ]
  },
  timespanOptions() {
    return [
      {
        key: REPORT_TIMESPAN_YEARLY,
        value: REPORT_TIMESPAN_YEARLY,
        text: 'Yearly'
      },
      {
        key: REPORT_TIMESPAN_MONTHLY,
        value: REPORT_TIMESPAN_MONTHLY,
        text: 'Monthly'
      }
    ]
  }
}

export default Report
