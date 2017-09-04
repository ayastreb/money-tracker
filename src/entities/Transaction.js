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
      tags: data.tags[data.kind] || []
    }
  },
  toForm(data) {
    return {
      ...data,
      amount: Currency.toFloat(
        data.amount * (data.kind === EXPENSE ? -1 : 1),
        data.currency
      ),
      linkedAmount:
        data.kind === TRANSFER
          ? Currency.toFloat(data.linkedAmount, data.linkedCurrency)
          : undefined
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      ...pick(data, Transaction.persistentKeys(data.kind))
    }
  },
  toStorage(data) {
    return pick(data, Transaction.persistentKeys(data.kind))
  },
  persistentKeys(kind) {
    const keys = [
      'kind',
      'date',
      'note',
      'tags',
      'accountId',
      'amount',
      'currency'
    ]
    if (kind === TRANSFER) {
      keys.push.apply(keys, [
        'linkedAccountId',
        'linkedAmount',
        'linkedCurrency'
      ])
    }

    return keys
  }
}

export default Transaction

function pick(object, keys) {
  return keys.reduce((acc, key) => {
    if (object[key] !== undefined) acc[key] = object[key]
    return acc
  }, {})
}
