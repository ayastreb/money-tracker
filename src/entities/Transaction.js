import Currency from './Currency'

export const EXPENSE = 'expense'
export const TRANSFER = 'transfer'
export const INCOME = 'income'

const Transaction = {
  defaultKind: EXPENSE,
  recentListLimit: 5,
  fromForm(data) {
    return {
      ...data,
      id: data.id || `T${Date.now()}`,
      amount: Currency.toInt(
        data.amount * (data.kind === EXPENSE ? -1 : 1),
        data.currency
      ),
      linkedAmount:
        data.kind === TRANSFER
          ? Currency.toInt(data.linkedAmount, data.linkedCurrency)
          : undefined,
      tags: data.tags || []
    }
  },
  toForm(data) {
    const kind =
      data.amount < 0 ? EXPENSE : data.linkedAccountId ? TRANSFER : INCOME
    return {
      kind,
      ...data,
      amount: Currency.toFloat(
        data.amount * (kind === EXPENSE ? -1 : 1),
        data.currency
      ),
      linkedAmount:
        kind === TRANSFER
          ? Currency.toFloat(data.linkedAmount, data.linkedCurrency)
          : undefined
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      ...Transaction.toStorage(data)
    }
  },
  toStorage(data) {
    const keys = ['date', 'note', 'tags', 'accountId', 'amount', 'currency']
    if (data.kind === TRANSFER || data.linkedAccountId) {
      keys.push.apply(keys, [
        'linkedAccountId',
        'linkedAmount',
        'linkedCurrency'
      ])
    }

    return pick(data, keys)
  }
}

export default Transaction

function pick(object, keys) {
  return keys.reduce((acc, key) => {
    if (object[key] !== undefined) acc[key] = object[key]
    return acc
  }, {})
}
