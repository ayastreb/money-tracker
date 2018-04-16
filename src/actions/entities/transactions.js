import { createActions } from 'redux-actions'

export const {
  loadFilterTransactions,
  loadFilterTransactionsSuccess,
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess,
  removeTransaction,
  removeTransactionSuccess
} = createActions(
  'LOAD_FILTER_TRANSACTIONS',
  'LOAD_FILTER_TRANSACTIONS_SUCCESS',
  'LOAD_RECENT_TRANSACTIONS',
  'LOAD_RECENT_TRANSACTIONS_SUCCESS',
  'SAVE_TRANSACTION',
  'SAVE_TRANSACTION_SUCCESS',
  'REMOVE_TRANSACTION',
  'REMOVE_TRANSACTION_SUCCESS'
)
