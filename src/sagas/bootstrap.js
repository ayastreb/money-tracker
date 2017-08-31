import { takeLatest } from 'redux-saga/effects'
import { bootstrap } from '../actions/app'
import { isUserLoggedIn } from './auth'
import { loadSetting } from './settings'
import { syncSaga } from './sync'

export function* bootstrapSaga() {
  yield isUserLoggedIn()
  yield loadSetting()
  yield syncSaga()
}

export default [takeLatest(bootstrap, bootstrapSaga)]
