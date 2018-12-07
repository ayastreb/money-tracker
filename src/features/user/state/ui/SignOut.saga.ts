import { takeLatest, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { signOut, signOutSuccess, signOutFailure } from './SignOut.action';
import { loadSetting } from 'sagas/settings';
import { isDemoUser } from 'features/user/state/User.saga';
import AccountsStorage from 'util/storage/accounts';
import SettingsStorage from 'util/storage/settings';
import TagsStorage from 'util/storage/tags';
import TransactionsStorage from 'util/storage/transactions';

export function* signOutSaga() {
  try {
    yield call(AccountsStorage.destroy);
    yield call(SettingsStorage.destroy);
    yield call(TagsStorage.destroy);
    yield call(TransactionsStorage.destroy);
    yield call([localStorage, 'clear']);

    yield put(signOutSuccess());
    yield isDemoUser();
    yield loadSetting();
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export default [takeLatest(getType(signOut), signOutSaga)];
