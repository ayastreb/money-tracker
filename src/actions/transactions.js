import { createActions } from 'redux-actions'
import { changeBalance } from './accounts'
import { useTag } from './tags'
import { setPendingChangesFlag } from './sync'
import transactions from '../util/storage/transactions'

export const {
  loadRecentTransactionsSuccess,
  saveTransactionRequest,
  saveTransactionSuccess
} = createActions(
  'LOAD_RECENT_TRANSACTIONS_SUCCESS',
  'SAVE_TRANSACTION_REQUEST',
  'SAVE_TRANSACTION_SUCCESS'
)

export function syncTransactions() {
  return dispatch =>
    transactions.sync().then(() => dispatch(loadRecentTransactions()))
}

export function loadRecentTransactions() {
  return dispatch =>
    transactions
      .loadRecent()
      .then(transactions =>
        dispatch(loadRecentTransactionsSuccess(transactions))
      )
}

export function saveTransaction(transaction) {
  return dispatch => {
    dispatch(saveTransactionRequest(transaction))

    return transactions.save(transaction).then(() => {
      dispatch(saveTransactionSuccess())
      dispatch(setPendingChangesFlag())
    })
  }
}

export function save(transaction) {
  return dispatch =>
    dispatch(saveTransaction(transaction))
      .then(() => {
        dispatch(
          changeBalance(
            transaction.accountId,
            transaction.currency,
            transaction.amount
          )
        )
        if (transaction.linkedAccountId) {
          dispatch(
            changeBalance(
              transaction.linkedAccountId,
              transaction.linkedCurrency,
              transaction.linkedAmount
            )
          )
        }
      })
      .then(() =>
        transaction.tags.forEach(tag => dispatch(useTag(transaction.kind, tag)))
      )
}
