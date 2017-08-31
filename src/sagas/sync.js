import { takeLatest, call, put } from 'redux-saga/effects'
import {
  sync,
  syncRequest,
  syncSuccess,
  syncFailure,
  setPendingChangesFlag
} from '../actions/sync'
import { saveAccountSuccess, removeAccountSuccess } from '../actions/accounts'
import { saveTransactionSuccess } from '../actions/transactions'
import { loadAccountsSaga } from './accounts'
import { loadExpenseTagsSaga, loadIncomeTagsSaga } from './tags'
import AccountsStorage from '../util/storage/accounts'
import TransactionsStorage from '../util/storage/transactions'
import TagsStorage from '../util/storage/tags'

export function* syncSaga() {
  yield put(syncRequest())
  try {
    yield call(AccountsStorage.sync)
    yield loadAccountsSaga()
    yield call(TransactionsStorage.sync)
    yield call(TagsStorage.sync)
    yield loadExpenseTagsSaga()
    yield loadIncomeTagsSaga()
    yield put(syncSuccess())
  } catch (error) {
    yield put(syncFailure(error))
  }
}

export function* setPendingChangesFlagSaga() {
  yield put(setPendingChangesFlag())
}

export default [
  takeLatest(sync, syncSaga),
  takeLatest(saveAccountSuccess, setPendingChangesFlagSaga),
  takeLatest(removeAccountSuccess, setPendingChangesFlagSaga),
  takeLatest(saveTransactionSuccess, setPendingChangesFlagSaga)
]
