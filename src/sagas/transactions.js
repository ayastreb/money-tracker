import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess
} from '../actions/entities/transactions'
import { useTag } from './tags'
import TransactionsStorage from '../util/storage/transactions'

export function* loadRecentTransactionsSaga() {
  const transactions = yield call(TransactionsStorage.loadRecent)
  yield put(loadRecentTransactionsSuccess(transactions))
}

export function* saveTransactionSaga(action) {
  const transaction = action.payload
  yield call(TransactionsStorage.save, transaction)
  for (let tag of transaction.tags) {
    yield call(useTag, transaction.kind, tag)
  }
  yield put(saveTransactionSuccess())
}

export default [
  takeLatest(loadRecentTransactions, loadRecentTransactionsSaga),
  takeLatest(saveTransaction, saveTransactionSaga)
]
