import {
  persistTransaction,
  retrieveRecentTransactions
} from '../util/storage/transactions'
import { changeAccountBalance } from './accounts'
import { useExpenseTag, useIncomeTag } from './tags'
import { CURRENCY } from '../constants/currency'

export const LOAD_TRANSACTIONS_FAILURE = 'LOAD_TRANSACTIONS_FAILURE'
export function loadRecentTransactions() {
  return async dispatch => {
    try {
      const transactions = await retrieveRecentTransactions()
      dispatch(updateRecentTransactionsList(transactions))
    } catch (error) {
      dispatch({ type: LOAD_TRANSACTIONS_FAILURE, error })
    }
  }
}

export const UPDATE_RECENT_TRANSACTIONS = 'UPDATE_RECENT_TRANSACTIONS'
export function updateRecentTransactionsList(transactions) {
  return {
    type: UPDATE_RECENT_TRANSACTIONS,
    transactions
  }
}

export const SAVE_TRANSACTION = 'SAVE_TRANSACTION'
export const SAVE_TRANSACTION_FAILURE = 'SAVE_TRANSACTION_FAILURE'
export function saveExpenseTransaction({
  accountId,
  amount,
  currency,
  tags,
  date,
  note
}) {
  return async dispatch => {
    const transaction = {
      id: `T${Date.now()}`,
      accountId,
      amount: amount * Math.pow(10, CURRENCY[currency].exp) * -1,
      currency,
      tags,
      date,
      note
    }
    dispatch({ type: SAVE_TRANSACTION, transaction })
    dispatch(changeAccountBalance(accountId, currency, transaction.amount))
    try {
      await persistTransaction(transaction)
      transaction.tags.forEach(tag => dispatch(useExpenseTag(tag)))
    } catch (error) {
      dispatch({ type: SAVE_TRANSACTION_FAILURE, error })
    }
  }
}

export function saveIncomeTransaction({
  accountId,
  amount,
  currency,
  tags,
  date,
  note
}) {
  return async dispatch => {
    const transaction = {
      id: `T${Date.now()}`,
      accountId,
      amount: amount * Math.pow(10, CURRENCY[currency].exp),
      currency,
      tags,
      date,
      note
    }
    dispatch({ type: SAVE_TRANSACTION, transaction })
    dispatch(changeAccountBalance(accountId, currency, transaction.amount))
    try {
      await persistTransaction(transaction)
      transaction.tags.forEach(tag => dispatch(useIncomeTag(tag)))
    } catch (error) {
      dispatch({ type: SAVE_TRANSACTION_FAILURE, error })
    }
  }
}

export function saveTransferTransaction({
  accountId,
  amount,
  currency,
  linkedAccountId,
  linkedAmount,
  linkedCurrency,
  date,
  note
}) {
  return async dispatch => {
    const transaction = {
      id: `T${Date.now()}`,
      accountId,
      amount: amount * Math.pow(10, CURRENCY[currency].exp),
      currency,
      linkedAccountId,
      linkedAmount: linkedCurrency === currency
        ? amount * Math.pow(10, CURRENCY[currency].exp)
        : linkedAmount * Math.pow(10, CURRENCY[linkedCurrency].exp),
      linkedCurrency,
      date,
      note
    }
    dispatch({ type: SAVE_TRANSACTION, transaction })
    dispatch(changeAccountBalance(accountId, currency, -1 * transaction.amount))
    dispatch(
      changeAccountBalance(
        linkedAccountId,
        linkedCurrency,
        transaction.linkedAmount
      )
    )
    try {
      await persistTransaction(transaction)
    } catch (error) {
      dispatch({ type: SAVE_TRANSACTION_FAILURE, error })
    }
  }
}
