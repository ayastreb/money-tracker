import { takeLatest, select, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { syncSaga } from 'sagas/sync';
import { loadSetting } from 'sagas/settings';
import { getCouchDBSetting } from './CouchDB.selector';
import * as CouchDB from './CouchDB.action';
import { isUserLoggedIn } from '../User.saga';

export function* finishCouchDBSettingSaga() {
  const couchDB = yield select(getCouchDBSetting);
  const userInfo = {
    accessToken: '',
    couchDB: { ...couchDB,
      accounts: `${couchDB.url}/accounts_${couchDB.username}`,
      settings: `${couchDB.url}/settings_${couchDB.username}`,
      tags: `${couchDB.url}/tags_${couchDB.username}`,
      transactions: `${couchDB.url}/transactions_${couchDB.username}`,
    }
  }
  yield call([localStorage, 'setItem'], 'userInfo', JSON.stringify(userInfo));
  yield loadSetting();
  yield syncSaga();
  yield isUserLoggedIn();
}

export default [
  takeLatest(getType(CouchDB.finishCouchDBSetting), finishCouchDBSettingSaga),
];
