import Currency from './Currency'

export const EXPENSE = 0
export const TRANSFER = 1
export const INCOME = 2
const KIND_LABEL = {
  0: 'Expense',
  1: 'Transfer',
  2: 'Income'
}

const Transaction = {
  defaultKind: EXPENSE,
  recentListLimit: 5,
  kindLabel(kind) {
    return KIND_LABEL[kind]
  },
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
          : undefined,
      tags: { [data.kind]: data.tags }
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
