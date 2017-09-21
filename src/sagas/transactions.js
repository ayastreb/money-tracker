import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess,
  removeTransaction
} from '../actions/entities/transactions'
import { updateAccount } from '../actions/entities/accounts'
import {
  fillInTransactionForm,
  resetTransactionForm
} from '../actions/ui/form/transaction'
import { getForm, getDefaultState } from '../selectors/ui/form/transaction'
import getAccountsMutations from '../entities/Transaction/AccountMutations'
import AccountsStorage from '../util/storage/accounts'
import TagsStorage from '../util/storage/tags'
import TransactionsStorage from '../util/storage/transactions'
import difference from '../util/SetDifference'

export function* resetTransactionFormSaga() {
  const initialData = yield select(getDefaultState)
  yield put(fillInTransactionForm(initialData))
}

export function* loadRecentTransactionsSaga() {
  const transactions = yield call(TransactionsStorage.loadRecent)
  yield put(loadRecentTransactionsSuccess(transactions))
}

export function* removeTransactionSaga() {
  const form = yield select(getForm)
  const transaction = yield call(TransactionsStorage.load, form.id)
  if (transaction) {
    yield call(updateAccountsBalance, transaction)
    yield call(updateTagsUsage, transaction)
    yield call(TransactionsStorage.remove, form.id)
    yield call(loadRecentTransactionsSaga)
    yield call(resetTransactionFormSaga)
  }
}

export function* saveTransactionSaga(action) {
  const next = action.payload
  const prev = yield call(TransactionsStorage.load, next.id)

  yield call(TransactionsStorage.save, next)
  yield call(updateAccountsBalance, prev, next)
  yield call(updateTagsUsage, prev, next)

  yield put(saveTransactionSuccess())
}

export function* updateAccountsBalance(prev, next) {
  for (const mutation of getAccountsMutations(prev, next)) {
    const account = yield call(AccountsStorage.mutateBalance, mutation)
    yield put(updateAccount(account))
  }
}

/**
 * Update tags usage based on previous and next transaction state.
 *
 * @param {array} prev
 * @param {array} next
 */
export function* updateTagsUsage(prev, next) {
  const prevTags = new Set((prev && prev.tags) || [])
  const nextTags = new Set((next && next.tags) || [])

  for (const newTag of difference(nextTags, prevTags)) {
    yield call(TagsStorage.updateUsage, next.kind, newTag, 1)
  }
  for (const oldTag of difference(prevTags, nextTags)) {
    yield call(TagsStorage.updateUsage, prev.kind, oldTag, -1)
  }
}

export default [
  takeLatest(resetTransactionForm, resetTransactionFormSaga),
  takeLatest(loadRecentTransactions, loadRecentTransactionsSaga),
  takeLatest(removeTransaction, removeTransactionSaga),
  takeLatest(saveTransaction, saveTransactionSaga)
]
