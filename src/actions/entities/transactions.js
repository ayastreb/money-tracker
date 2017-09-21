import { createActions } from 'redux-actions'

export const {
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess,
  removeTransaction
} = createActions(
  'LOAD_RECENT_TRANSACTIONS',
  'LOAD_RECENT_TRANSACTIONS_SUCCESS',
  'SAVE_TRANSACTION',
  'SAVE_TRANSACTION_SUCCESS',
  'REMOVE_TRANSACTION'
)
