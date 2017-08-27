import { CURRENCY } from '../constants/currency'

export const EXPENSE = 'expense'
export const TRANSFER = 'transfer'
export const INCOME = 'income'

export default class Transaction {
  static kinds = [EXPENSE, TRANSFER, INCOME]
  static defaultKind = EXPENSE
  static recentListLimit = 5

  static fromForm = input => {
    let data = {
      ...input,
      amount: input.amount * Math.pow(10, CURRENCY[input.currency].exp)
    }
    if (data.kind !== INCOME) {
      data.amount *= -1
    }
    if (data.linkedAmount) {
      data.linkedAmount *= Math.pow(10, CURRENCY[data.linkedCurrency].exp)
    }

    return new Transaction(data)
  }

  constructor({
    id,
    kind,
    accountId,
    currency,
    amount,
    linkedAccountId,
    linkedCurrency,
    linkedAmount,
    date,
    note,
    tags
  }) {
    this.id = id || `T${Date.now()}`
    this.kind = kind
    this.accountId = accountId
    this.currency = currency
    this.amount = amount
    this.linkedAccountId = linkedAccountId
    this.linkedCurrency = linkedCurrency
    this.linkedAmount = linkedCurrency !== currency ? linkedAmount : amount
    this.date = date
    this.note = note
    this.tags = tags || []
  }

  toJSON() {
    const json = {
      date: this.date,
      note: this.note,
      tags: this.tags,
      accountId: this.accountId,
      currency: this.currency,
      amount: this.amount
    }
    if (this.kind === TRANSFER) {
      json.linkedAccountId = this.linkedAccountId
      json.linkedCurrency = this.linkedCurrency
      json.linkedAmount = this.linkedAmount
    }

    return json
  }
}
