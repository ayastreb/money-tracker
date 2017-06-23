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

export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST'
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS'
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE'
export function createTransaction({
  accountId,
  amount,
  currency,
  tags,
  date,
  note
}) {
  return async dispatch => {
    dispatch({ type: CREATE_TRANSACTION_REQUEST })
    try {
      const amountInCents = amount * Math.pow(10, CURRENCY[currency].exp)
      const request = {
        accountId,
        amount: amountInCents,
        currency,
        tags,
        date,
        note
      }
      const transaction = await persistTransaction(request)
      dispatch(changeAccountBalance(accountId, currency, amountInCents))
      dispatch({ type: CREATE_TRANSACTION_SUCCESS, transaction })
    } catch (error) {
      dispatch({ type: CREATE_TRANSACTION_FAILURE, error })
    }
  }
}
