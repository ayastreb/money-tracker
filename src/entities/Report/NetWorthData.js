import format from 'date-fns/format'
import getDaysInMonth from 'date-fns/get_days_in_month'
import range from 'lodash/range'
import { toUtcTimestamp } from '../../util/timezone'
import Currency from '../Currency'
import { TIMESPAN_YEARLY } from '../Report'
import { EXPENSE, INCOME } from '../Transaction'

export default function NetWorthData(
  report,
  transactions,
  base,
  exchangeRate,
  netWorthEnd
) {
  const labels =
    report.timespan === TIMESPAN_YEARLY
      ? range(0, 12).map(month => format(new Date().setMonth(month), 'MMM'))
      : range(1, getDaysInMonth(report.date.start) + 1)
  const data = []
  let lastPeriod
  for (const tx of transactions) {
    if (tx.kind !== EXPENSE && tx.kind !== INCOME) continue

    const period =
      format(
        toUtcTimestamp(tx.date),
        report.timespan === TIMESPAN_YEARLY ? 'M' : 'D'
      ) - 1
    if (period !== lastPeriod) {
      if (lastPeriod === undefined) {
        lastPeriod = period + 1
        data[lastPeriod] = netWorthEnd
      }
      data[period] = data[lastPeriod]
    }

    lastPeriod = period

    data[period] -= Currency.convert(
      tx.amount,
      exchangeRate[tx.currency],
      base,
      tx.currency
    )
  }

  if (lastPeriod > 0) data[0] = data[lastPeriod]
  if (report.date.end < Date.now() && data.length < labels.length) {
    data[labels.length - 1] = data[data.length - 1]
  }

  return {
    labels,
    series: [
      data.map(amount => Math.floor(Currency.toFloat(amount, base, false)))
    ],
    netWorthStart: data[0],
    netWorthEnd
  }
}
