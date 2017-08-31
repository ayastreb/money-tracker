import { takeLatest, select, call, put } from 'redux-saga/effects'
import {
  sendCode,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure,
  finishAuth
} from '../actions/ui/auth'
import { userLoggedIn } from '../actions/user'
import { getAuthEmail, getAuthCode } from '../selectors/ui/auth'
import { loadSetting } from './settings'
import Auth from '../util/auth'

export function* isUserLoggedIn() {
  const userInfo = yield call([localStorage, 'getItem'], 'userInfo')
  if (userInfo) yield put(userLoggedIn())
}

export function* sendCodeSaga() {
  const email = yield select(getAuthEmail)
  try {
    yield call(Auth.sendCode, email)
    yield put(sendCodeSuccess())
  } catch (error) {
    yield put(sendCodeFailure(error))
  }
}

export function* verifyCodeSaga() {
  const email = yield select(getAuthEmail)
  const code = yield select(getAuthCode)
  try {
    yield call(Auth.verifyCode, email, code)
    yield put(verifyCodeSuccess())
  } catch (error) {
    yield put(verifyCodeFailure(error))
  }
}

export function* finishAuthSaga(action) {
  const hash = action.payload
  const accessToken = yield call(Auth.parseHash, hash)
  const userInfo = yield call(Auth.getUserInfo, accessToken)
  yield call([localStorage, 'setItem'], 'userInfo', JSON.stringify(userInfo))

  yield loadSetting()
  yield isUserLoggedIn()
}

export default [
  takeLatest(sendCode, sendCodeSaga),
  takeLatest(verifyCode, verifyCodeSaga),
  takeLatest(finishAuth, finishAuthSaga)
]
