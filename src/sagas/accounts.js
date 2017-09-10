import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountSuccess,
  saveAccountFailure,
  removeAccount,
  removeAccountSuccess
} from '../actions/entities/accounts'
import { saveTransaction } from '../actions/entities/transactions'
import { getAccount } from '../selectors/entities/accounts'
import AccountsStorage from '../util/storage/accounts'

export function* loadAccountsSaga() {
  const accounts = yield call(AccountsStorage.loadAll)
  yield put(loadAccountsSuccess(accounts))
}

export function* saveAccountSaga(action) {
  const account = action.payload
  try {
    yield call(AccountsStorage.save, account)
    yield put(saveAccountSuccess())
  } catch (error) {
    yield put(saveAccountFailure(account.id))
  }
}

export function* saveTransactionSaga(action) {
  const transaction = action.payload
  const accountSelector = yield call(getAccount, transaction.accountId)
  const account = yield select(accountSelector)
  yield call(AccountsStorage.save, account)
  if (transaction.linkedAccountId) {
    const linkedAccountSelector = yield call(
      getAccount,
      transaction.linkedAccountId
    )
    const linkedAccount = yield select(linkedAccountSelector)
    yield call(AccountsStorage.save, linkedAccount)
  }
}

export function* removeAccountSaga(action) {
  const id = action.payload
  yield call(AccountsStorage.remove, id)
  yield put(removeAccountSuccess())
}

export default [
  takeLatest(loadAccounts, loadAccountsSaga),
  takeLatest(saveAccount, saveAccountSaga),
  takeLatest(saveTransaction, saveTransactionSaga),
  takeLatest(removeAccount, removeAccountSaga)
]
