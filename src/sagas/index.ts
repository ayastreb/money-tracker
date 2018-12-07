import { all } from 'redux-saga/effects';
import accounts from './accounts';
import bootstrap from './bootstrap';
import dataImport from './dataImport';
import report from './report';
import settings from './settings';
import sync from './sync';
import tags from './tags';
import transactions from './transactions';
import { UserSaga } from 'features/user/state';

export default function* rootSaga() {
  yield all([
    ...UserSaga,
    ...accounts,
    ...bootstrap,
    ...dataImport,
    ...report,
    ...settings,
    ...sync,
    ...tags,
    ...transactions
  ]);
}
