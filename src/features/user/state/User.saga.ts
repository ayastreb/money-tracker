import { call, put } from 'redux-saga/effects';
import { syncSaga } from 'sagas/sync';
import * as user from './User.action';

export function* isDemoUser() {
  if (window.location.hostname === process.env.REACT_APP_DEMO_HOST) {
    const userInfo = yield call([localStorage, 'getItem'], 'userInfo');
    if (!userInfo) {
      yield call(
        [localStorage, 'setItem'],
        'userInfo',
        JSON.stringify({
          couchDB: {
            accounts: process.env.REACT_APP_DEMO_DB_ACCOUNTS,
            settings: process.env.REACT_APP_DEMO_DB_SETTINGS,
            tags: process.env.REACT_APP_DEMO_DB_TAGS,
            transactions: process.env.REACT_APP_DEMO_DB_TRANSACTIONS
          }
        })
      );
      yield syncSaga();
    }
    yield put(user.setDemoUser());
    yield put(user.signInSuccess());
  }
}

export function* isUserLoggedIn() {
  const userInfo = yield call([localStorage, 'getItem'], 'userInfo');
  if (userInfo) yield put(user.signInSuccess());
}
