import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  sync,
  syncRequest,
  syncSuccess,
  syncFailure,
  setPendingChangesFlag
} from '../actions/ui/sync';
import {
  saveAccountSuccess,
  removeAccountSuccess
} from '../actions/entities/accounts';
import {
  saveTransactionSuccess,
  removeTransactionSuccess
} from '../actions/entities/transactions';
import { loadAccountsSaga } from './accounts';
import { loadTagsSaga } from './tags';
import { loadRecentTransactionsSaga } from './transactions';
import { isDemoUser } from 'features/user/state/User.selector';
import AccountsStorage from '../util/storage/accounts';
import TransactionsStorage from '../util/storage/transactions';
import TagsStorage from '../util/storage/tags';

export function* syncSaga() {
  yield put(syncRequest());
  try {
    const readOnly = yield select(isDemoUser);
    yield call(AccountsStorage.sync, readOnly);
    yield call(TransactionsStorage.sync, readOnly);
    yield call(TagsStorage.sync, readOnly);
    yield loadRecentTransactionsSaga();
    yield loadAccountsSaga();
    yield loadTagsSaga();
    yield put(syncSuccess());
  } catch (error) {
    yield put(syncFailure(error));
  }
}

export function* setPendingChangesFlagSaga() {
  yield put(setPendingChangesFlag());
}

export default [
  takeLatest(sync, syncSaga),
  takeLatest(saveAccountSuccess, setPendingChangesFlagSaga),
  takeLatest(removeAccountSuccess, setPendingChangesFlagSaga),
  takeLatest(saveTransactionSuccess, setPendingChangesFlagSaga),
  takeLatest(removeTransactionSuccess, setPendingChangesFlagSaga)
];
