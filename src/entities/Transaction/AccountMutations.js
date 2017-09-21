import { TRANSFER } from '../Transaction'

/**
 * Get all necessary accounts balance mutations for given transaction change.
 *
 * @param {Transaction} prev
 * @param {Transaction} next
 * @return {array}
 */
export default function getAccountsMutations(prev, next) {
  const mutations = []
  const isNew = !prev
  const isRemoved = !next

  if (isNew) {
    mutations.push(...createTransaction(next))
  } else if (isRemoved) {
    mutations.push(...removeTransaction(prev))
  } else if (isAmountChanged(prev, next)) {
    mutations.push(...changeTransactionAmount(prev, next))
  } else {
    mutations.push(...removeTransaction(prev))
    mutations.push(...createTransaction(next))
  }

  return mutations
}

function isAmountChanged(prev, next) {
  const fields = ['kind', 'accountId', 'currency']
  if (prev.kind === TRANSFER || next.kind === TRANSFER) {
    fields.push('linkedAccountId', 'linkedCurrency')
  }

  return fields.every(field => prev[field] === next[field])
}

function createTransaction(transaction) {
  const mutations = []
  if (
    transaction.kind === TRANSFER &&
    transaction.accountId === transaction.linkedAccountId &&
    transaction.currency === transaction.linkedCurrency
  ) {
    return mutations
  }

  mutations.push({
    accountId: transaction.accountId,
    currency: transaction.currency,
    amount: transaction.amount * (transaction.kind === TRANSFER ? -1 : 1)
  })
  if (transaction.kind === TRANSFER) {
    mutations.push({
      accountId: transaction.linkedAccountId,
      currency: transaction.linkedCurrency,
      amount: transaction.linkedAmount
    })
  }

  return mutations
}

function changeTransactionAmount(prev, next) {
  const mutations = []
  const amount = (next.amount - prev.amount) * (next.kind === TRANSFER ? -1 : 1)
  if (amount !== 0) {
    mutations.push({
      accountId: next.accountId,
      currency: next.currency,
      amount
    })
  }

  if (next.kind === TRANSFER) {
    const linkedAmount = next.linkedAmount - prev.linkedAmount
    if (linkedAmount !== 0) {
      mutations.push({
        accountId: next.linkedAccountId,
        currency: next.linkedCurrency,
        amount: linkedAmount
      })
    }
  }

  return mutations
}

function removeTransaction(transaction) {
  const mutations = []
  mutations.push({
    accountId: transaction.accountId,
    currency: transaction.currency,
    amount: transaction.amount * (transaction.kind === TRANSFER ? 1 : -1)
  })
  if (transaction.kind === TRANSFER) {
    mutations.push({
      accountId: transaction.linkedAccountId,
      currency: transaction.linkedCurrency,
      amount: transaction.linkedAmount * -1
    })
  }

  return mutations
}
