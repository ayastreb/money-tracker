import { takeLatest } from 'redux-saga/effects'
import { bootstrap } from '../actions/app'
import { isUserLoggedIn } from './auth'
import { loadSetting } from './settings'

export function* bootstrapSaga() {
  yield isUserLoggedIn()
  yield loadSetting()
}

export default [takeLatest(bootstrap, bootstrapSaga)]
