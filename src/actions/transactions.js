import {
  persistTransaction,
  retrieveRecentTransactions
} from '../util/storage/transactions'
import { changeAccountBalance } from './accounts'
import { CURRENCY } from '../constants/currency'
import { RECENT_TRANSACTIONS_LIMIT } from '../constants/transaction'

export const LOAD_RECENT_TRANSACTIONS = 'LOAD_RECENT_TRANSACTIONS'
export const LOAD_TRANSACTIONS_FAILURE = 'LOAD_TRANSACTIONS_FAILURE'
export function loadRecentTransactions(limit = RECENT_TRANSACTIONS_LIMIT) {
  return async dispatch => {
    try {
      const transactions = await retrieveRecentTransactions(limit)
      dispatch({
        type: LOAD_RECENT_TRANSACTIONS,
        transactions
      })
    } catch (error) {
      dispatch({
        type: LOAD_TRANSACTIONS_FAILURE,
        error
      })
    }
  }
}

export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE'

/**
 * Build document ID based on transaction created at timestamp and account ID
 * for easier sorting and filtering.
 * @see https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html
 */
export function createTransaction({
  accountId,
  amount,
  currency,
  tags,
  date,
  note
}) {
  return async dispatch => {
    const transaction = {
      id: `${accountId}/${Date.now()}`,
      accountId,
      amount: amount * Math.pow(10, CURRENCY[currency].exp),
      currency,
      tags,
      date,
      note
    }
    dispatch({ type: CREATE_TRANSACTION, transaction })
    dispatch(changeAccountBalance(accountId, currency, transaction.amount))
    try {
      await persistTransaction(transaction)
    } catch (error) {
      dispatch({ type: CREATE_TRANSACTION_FAILURE, error })
    }
  }
}
