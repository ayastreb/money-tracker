import { all } from 'redux-saga/effects'
import accounts from './accounts'
import auth from './auth'
import bootstrap from './bootstrap'
import dataImport from './dataImport'
import report from './report'
import settings from './settings'
import sync from './sync'
import tags from './tags'
import transactions from './transactions'

export default function* rootSaga() {
  yield all([
    ...accounts,
    ...auth,
    ...bootstrap,
    ...dataImport,
    ...report,
    ...settings,
    ...sync,
    ...tags,
    ...transactions
  ])
}
