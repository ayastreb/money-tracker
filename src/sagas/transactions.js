import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess
} from '../actions/entities/transactions'
import { updateAccount } from '../actions/entities/accounts'
import { TRANSFER } from '../entities/Transaction'
import AccountsStorage from '../util/storage/accounts'
import TagsStorage from '../util/storage/tags'
import TransactionsStorage from '../util/storage/transactions'

export function* loadRecentTransactionsSaga() {
  const transactions = yield call(TransactionsStorage.loadRecent)
  yield put(loadRecentTransactionsSuccess(transactions))
}

export function* saveTransactionSaga(action) {
  const transaction = action.payload
  yield call(TransactionsStorage.save, transaction)
  yield mutateAffectedAccounts(transaction)
  // TODO: move to transaction storage and check real usage for exisitng tx.
  for (const tag of transaction.tags) {
    yield call(TagsStorage.increaseUsage, transaction.kind, tag)
  }
  yield put(saveTransactionSuccess())
}

export function* mutateAffectedAccounts(transaction) {
  if (
    transaction.kind === TRANSFER &&
    transaction.accountId === transaction.linkedAccountId &&
    transaction.currency === transaction.linkedCurrency
  ) {
    return
  }

  const account = yield call(
    AccountsStorage.mutateBalance,
    transaction.accountId,
    transaction.currency,
    transaction.amount * (transaction.kind === TRANSFER ? -1 : 1)
  )
  yield put(updateAccount(account))

  if (transaction.kind === TRANSFER) {
    const linkedAccount = yield call(
      AccountsStorage.mutateBalance,
      transaction.linkedAccountId,
      transaction.linkedCurrency,
      transaction.linkedAmount
    )
    yield put(updateAccount(linkedAccount))
  }
}

export default [
  takeLatest(loadRecentTransactions, loadRecentTransactionsSaga),
  takeLatest(saveTransaction, saveTransactionSaga)
]
