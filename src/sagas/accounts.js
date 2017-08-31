import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountSuccess,
  saveAccountFailure,
  removeAccount,
  removeAccountSuccess,
  changeBalance
} from '../actions/accounts'
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

export function* removeAccountSaga(action) {
  const id = action.payload
  yield call(AccountsStorage.remove, id)
  yield put(removeAccountSuccess())
}

export function* changeBalanceSaga(action) {
  const { id, currency, amount } = action.payload
  yield call(AccountsStorage.changeBalance, id, currency, amount)
}

export default [
  takeLatest(loadAccounts, loadAccountsSaga),
  takeLatest(saveAccount, saveAccountSaga),
  takeLatest(removeAccount, removeAccountSaga),
  takeLatest(changeBalance, changeBalanceSaga)
]
