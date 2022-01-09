import { takeLatest, select, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { syncSaga } from 'sagas/sync';
import { loadSetting } from 'sagas/settings';
import { getCouchDBSetting } from './CouchDB.selector';
import * as CouchDB from './CouchDB.action';
import { isUserLoggedIn } from '../User.saga';

export function* finishCouchDBSettingSaga() {
  const couchDB = yield select(getCouchDBSetting);
  const prefix = `moneytracker_${couchDB.username}`;
  const userInfo = {
    accessToken: '',
    couchDB: { ...couchDB,
      accounts: `${couchDB.url}/${prefix}_accounts`,
      settings: `${couchDB.url}/${prefix}_settings`,
      tags: `${couchDB.url}/${prefix}_tags`,
      transactions: `${couchDB.url}/${prefix}_transactions`,
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
