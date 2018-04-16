import { TRANSFER } from '../Transaction'

/**
 * Get all necessary accounts balance mutations for given transaction change.
 *
 * @param {Transaction} prev
 * @param {Transaction} next
 * @return {array}
 */
export default function getAccountsMutations(prev, next) {
  const isNew = !prev
  const isRemoved = !next

  if (isNew) return createTransaction(next)
  if (isRemoved) return removeTransaction(prev)

  return [...removeTransaction(prev), ...createTransaction(next)]
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
