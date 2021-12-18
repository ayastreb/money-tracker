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
    'accessToken': '',
    "couchDB": { ...couchDB,
      "transactions": couchDB.url + "/money_tracker_transactions_" + couchDB.username,
      "accounts": couchDB.url + "/money_tracker_accounts_" + couchDB.username,
      "settings": couchDB.url + "/money_tracker_settings_" + couchDB.username,
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
