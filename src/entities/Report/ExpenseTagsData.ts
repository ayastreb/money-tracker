import Currency, { ExchangeRateT } from 'entities/Currency';
import { TransactionStateT, TransationKindT } from 'entities/Transaction';
import { ReportStateT, ReportDataT } from 'entities/Report';

export default function ExpenseTagsData(
  report: ReportStateT,
  transactions: TransactionStateT[],
  exchangeRate: ExchangeRateT,
  base: string
): ReportDataT {
  const data = new Map();

  for (const tx of transactions) {
    if (tx.kind !== TransationKindT.Expense || !tx.tags) continue;
    for (const tag of tx.tags) {
      const tagAmount = data.get(tag) || 0;
      const amount = Currency.convert(
        Math.abs(tx.amount),
        exchangeRate[tx.currency],
        base,
        tx.currency
      );
      data.set(tag, tagAmount + amount);
    }
  }

  const sorted = new Map([...data.entries()].sort((a, b) => b[1] - a[1]));

  return {
    labels: [...sorted.keys()],
    series: [
      [...sorted.values()].map(amount =>
        Math.floor(Currency.centsToNumber(amount, base))
      )
    ]
  };
}
