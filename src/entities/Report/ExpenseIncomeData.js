import format from 'date-fns/format'
import getDaysInMonth from 'date-fns/get_days_in_month'
import range from 'lodash/range'
import Currency from '../Currency'
import { TIMESPAN_YEARLY } from '../Report'
import { INCOME, EXPENSE } from '../Transaction'
import { toUtcTimestamp } from '../../util/timezone'

export default function ExpenseIncomeData(
  report,
  transactions,
  base,
  exchangeRate
) {
  const labels =
    report.timespan === TIMESPAN_YEARLY
      ? range(0, 12).map(month => format(new Date().setMonth(month), 'MMM'))
      : range(1, getDaysInMonth(report.date.start) + 1)
  const data = [
    new Array(labels.length).fill(0), // income series
    new Array(labels.length).fill(0) // expense series
  ]

  for (const tx of transactions) {
    if (tx.kind !== EXPENSE && tx.kind !== INCOME) continue

    const period = format(
      toUtcTimestamp(tx.date),
      report.timespan === TIMESPAN_YEARLY ? 'M' : 'D'
    )
    data[tx.kind === INCOME ? 0 : 1][period - 1] += Currency.convert(
      Math.abs(tx.amount),
      exchangeRate[tx.currency],
      base,
      tx.currency
    )
  }

  return {
    labels,
    series: data.map(set =>
      set.map(amount => Math.floor(Currency.toFloat(amount, base, false)))
    )
  }
}
