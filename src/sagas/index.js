import { all } from 'redux-saga/effects'
import auth from './auth'
import bootstrap from './bootstrap'
import settings from './settings'

export default function* rootSaga() {
  yield all([...auth, ...bootstrap, ...settings])
}
