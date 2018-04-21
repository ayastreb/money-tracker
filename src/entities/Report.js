import addMonths from 'date-fns/add_months'
import addYears from 'date-fns/add_years'
import endOfMonth from 'date-fns/end_of_month'
import endOfYear from 'date-fns/end_of_year'
import format from 'date-fns/format'
import startOfMonth from 'date-fns/start_of_month'
import startOfYear from 'date-fns/start_of_year'
import subMonths from 'date-fns/sub_months'
import subYears from 'date-fns/sub_years'
import { toUtcTimestamp } from '../util/timezone'
import ExpenseIncomeData from './Report/ExpenseIncomeData'
import NetWorthData from './Report/NetWorthData'
import ExpenseTagsData from './Report/ExpenseTagsData'

export const REPORT_EXPENSE_INCOME = 'expense_income'
export const REPORT_EXPENSE_TAGS = 'expense_tags'
export const REPORT_NET_WORTH = 'net_worth'
export const TIMESPAN_YEARLY = 'yearly'
export const TIMESPAN_MONTHLY = 'monthly'

const Report = {
  defaultKind: REPORT_EXPENSE_INCOME,
  defaultTimespan: TIMESPAN_YEARLY,
  defaultDate(timespan = TIMESPAN_YEARLY) {
    return dateRange(new Date(), timespan)
  },
  moveDateBackwards(date, timespan) {
    return dateRange(
      timespan === TIMESPAN_YEARLY
        ? subYears(date.start, 1)
        : subMonths(date.start, 1),
      timespan
    )
  },
  moveDateForwards(date, timespan) {
    return dateRange(
      timespan === TIMESPAN_YEARLY
        ? addYears(date.start, 1)
        : addMonths(date.start, 1),
      timespan
    )
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
        key: TIMESPAN_YEARLY,
        value: TIMESPAN_YEARLY,
        text: 'Yearly'
      },
      {
        key: TIMESPAN_MONTHLY,
        value: TIMESPAN_MONTHLY,
        text: 'Monthly'
      }
    ]
  },
  timespanLabel(date, timespan) {
    return format(date, timespan === TIMESPAN_YEARLY ? 'YYYY' : 'MMM, YYYY')
  },
  transactionFilters(report) {
    return {
      date: report.date,
      accounts: report.accounts
    }
  },
  prepareData(report, transactions, base, exchangeRate, netWorthEnd) {
    switch (report.kind) {
      case REPORT_EXPENSE_INCOME:
        return ExpenseIncomeData(report, transactions, base, exchangeRate)
      case REPORT_NET_WORTH:
        return NetWorthData(
          report,
          transactions,
          base,
          exchangeRate,
          netWorthEnd
        )
      case REPORT_EXPENSE_TAGS:
        return ExpenseTagsData(report, transactions, base, exchangeRate)
      default:
        return undefined
    }
  }
}

export default Report

function dateRange(date, timespan) {
  const start = timespan === TIMESPAN_YEARLY ? startOfYear : startOfMonth
  const end = timespan === TIMESPAN_YEARLY ? endOfYear : endOfMonth
  return {
    start: toUtcTimestamp(start(date)),
    end: toUtcTimestamp(end(date))
  }
}
