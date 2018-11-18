import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/get_days_in_month';
import range from 'lodash/range';
import { toUtcTimestamp } from 'util/timezone';
import Currency, { ExchangeRateT } from 'entities/Currency';
import { ReportStateT, ReportDataT, ReportTimespanT } from 'entities/Report';
import { TransactionStateT, TransationKindT } from 'entities/Transaction';

const { Expense, Income } = TransationKindT;

export default function NetWorthData(
  report: ReportStateT,
  transactions: TransactionStateT[],
  exchangeRate: ExchangeRateT,
  base: string,
  netWorthEnd: number
): ReportDataT {
  const labels =
    report.timespan === ReportTimespanT.Yearly
      ? range(0, 12).map(month => format(new Date().setMonth(month), 'MMM'))
      : range(1, getDaysInMonth(report.date.start) + 1).map(day =>
          `${day}`.padStart(2, '0')
        );

  const data = [];
  let lastPeriod: number | undefined;
  for (const tx of transactions) {
    if (tx.kind !== Expense && tx.kind !== Income) continue;

    const period =
      parseInt(
        format(
          toUtcTimestamp(tx.date),
          report.timespan === ReportTimespanT.Yearly ? 'M' : 'D'
        )
      ) - 1;
    if (period !== lastPeriod) {
      if (lastPeriod === undefined) {
        lastPeriod = period + 1;
        data[lastPeriod] = netWorthEnd;
      }
      data[period] = data[lastPeriod];
    }

    lastPeriod = period;

    data[period] -= Currency.convert(
      tx.amount,
      exchangeRate[tx.currency],
      base,
      tx.currency
    );
  }

  if (lastPeriod && lastPeriod > 0) data[0] = data[lastPeriod];
  if (report.date.end < Date.now() && data.length < labels.length) {
    data[labels.length - 1] = data[data.length - 1];
  }

  return {
    labels,
    series: [
      data.map(amount => Math.floor(Currency.centsToNumber(amount, base)))
    ],
    netWorthStart: data[0],
    netWorthEnd
  };
}
