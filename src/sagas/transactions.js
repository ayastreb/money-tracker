import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess
} from '../actions/transactions'
import { changeBalance } from '../actions/accounts'
import { useTag } from './tags'
import TransactionsStorage from '../util/storage/transactions'

export function* loadRecentTransactionsSaga() {
  const transactions = yield call(TransactionsStorage.loadRecent)
  yield put(loadRecentTransactionsSuccess(transactions))
}

export function* saveTransactionSaga(action) {
  const transaction = action.payload
  yield call(TransactionsStorage.save, transaction)
  yield put(
    changeBalance({
      id: transaction.accountId,
      currency: transaction.currency,
      amount: transaction.amount
    })
  )
  if (transaction.linkedAccountId) {
    yield put(
      changeBalance({
        id: transaction.linkedAccountId,
        currency: transaction.linkedCurrency,
        amount: transaction.linkedAmount
      })
    )
  }
  for (let tag of transaction.tags) {
    yield call(useTag, transaction.kind, tag)
  }
  yield put(saveTransactionSuccess())
}

export default [
  takeLatest(loadRecentTransactions, loadRecentTransactionsSaga),
  takeLatest(saveTransaction, saveTransactionSaga)
]
