import Currency from '../Currency'
import { EXPENSE } from '../Transaction'

export default function ExpenseTagsData(
  report,
  transactions,
  base,
  exchangeRate
) {
  const data = new Map()

  for (const tx of transactions) {
    if (tx.kind !== EXPENSE || !tx.tags) continue
    for (const tag of tx.tags) {
      const tagAmount = data.get(tag) || 0
      const amount = Currency.convert(
        Math.abs(tx.amount),
        exchangeRate[tx.currency],
        base,
        tx.currency
      )
      data.set(tag, tagAmount + amount)
    }
  }

  const sorted = new Map([...data.entries()].sort((a, b) => b[1] - a[1]))

  return {
    labels: [...sorted.keys()],
    series: [
      [...sorted.values()].map(amount =>
        Math.floor(Currency.toFloat(amount, base, false))
      )
    ]
  }
}
