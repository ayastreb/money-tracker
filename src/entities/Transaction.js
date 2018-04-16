import pick from 'lodash/pick'
import format from 'date-fns/format'
import Currency from './Currency'
import { toLocalTimestamp } from '../util/timezone'

export const EXPENSE = 0
export const TRANSFER = 1
export const INCOME = 2
const KIND_LABEL = {
  [EXPENSE]: 'Expense',
  [TRANSFER]: 'Transfer',
  [INCOME]: 'Income'
}

const Transaction = {
  defaultKind: EXPENSE,
  recentListLimit: 5,
  rowsPerSearchPage: 10,
  pagerSizeMobile: 5,
  pagerSizeDesktop: 9,
  kindLabel(kind) {
    return KIND_LABEL[kind]
  },
  fromForm(data) {
    const tags = data.tags[data.kind]
    return {
      ...data,
      amount: Currency.toInt(
        data.amount * (data.kind === EXPENSE ? -1 : 1),
        data.currency
      ),
      linkedAmount:
        data.kind === TRANSFER
          ? Currency.toInt(data.linkedAmount, data.linkedCurrency)
          : undefined,
      note: data.note || undefined,
      tags: tags && tags.length > 0 ? tags : undefined,
      date: new Date(data.date).getTime()
    }
  },
  toForm(data) {
    return {
      ...data,
      amount: Currency.toFloat(
        data.amount * (data.kind === EXPENSE ? -1 : 1),
        data.currency,
        false
      ),
      linkedAmount:
        data.kind === TRANSFER
          ? Currency.toFloat(data.linkedAmount, data.linkedCurrency)
          : undefined,
      note: data.note || '',
      tags: { [EXPENSE]: [], [INCOME]: [], [data.kind]: data.tags || [] },
      date: data.date
        ? format(toLocalTimestamp(data.date), 'YYYY-MM-DD')
        : undefined
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      date: parseInt(data._id.match(/T([0-9]+)-/)[1], 10),
      ...pick(data, Transaction.persistentKeys(data))
    }
  },
  toStorage(data) {
    return pick(data, Transaction.persistentKeys(data))
  },
  persistentKeys(data) {
    const keys = ['kind', 'note', 'tags', 'accountId', 'amount', 'currency']
    if (data.kind === TRANSFER) {
      keys.push(...['linkedAccountId', 'linkedAmount', 'linkedCurrency'])
    }

    return keys
  }
}

export default Transaction
