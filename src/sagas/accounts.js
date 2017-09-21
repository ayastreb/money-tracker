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
import { getForm } from '../selectors/ui/form/transaction'
import { resetTransactionFormSaga } from './transactions'
import AccountsStorage from '../util/storage/accounts'

export function* loadAccountsSaga() {
  const accounts = yield call(AccountsStorage.loadAll)
  yield put(loadAccountsSuccess(accounts))
  const transactionForm = yield select(getForm)
  if (!transactionForm.accountId && accounts.length > 0) {
    yield resetTransactionFormSaga()
  }
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

export default [
  takeLatest(loadAccounts, loadAccountsSaga),
  takeLatest(saveAccount, saveAccountSaga),
  takeLatest(removeAccount, removeAccountSaga)
]
