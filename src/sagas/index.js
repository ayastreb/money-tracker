import { all } from 'redux-saga/effects'
import accounts from './accounts'
import auth from './auth'
import bootstrap from './bootstrap'
import settings from './settings'
import sync from './sync'
import tags from './tags'
import transactions from './transactions'

export default function* rootSaga() {
  yield all([
    ...accounts,
    ...auth,
    ...bootstrap,
    ...settings,
    ...sync,
    ...tags,
    ...transactions
  ])
}
