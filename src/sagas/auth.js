import { takeLatest, select, call, put } from 'redux-saga/effects'
import {
  sendCode,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure,
  finishAuth
} from '../actions/ui/form/auth'
import {
  userLoggedIn,
  demoUser,
  signOut,
  signOutComplete
} from '../actions/user'
import { getAuthEmail, getAuthCode } from '../selectors/ui/form/auth'
import { loadSetting } from './settings'
import { syncSaga } from './sync'
import Auth from '../util/auth'
import AccountsStorage from '../util/storage/accounts'
import SettingsStorage from '../util/storage/settings'
import TagsStorage from '../util/storage/tags'
import TransactionsStorage from '../util/storage/transactions'

export function* isDemoUser() {
  if (window.location.hostname === process.env.REACT_APP_DEMO_HOST) {
    const userInfo = yield call([localStorage, 'getItem'], 'userInfo')
    if (!userInfo) {
      yield call(
        [localStorage, 'setItem'],
        'userInfo',
        JSON.stringify({
          couchDB: {
            accounts: process.env.REACT_APP_DEMO_DB_ACCOUNTS,
            settings: process.env.REACT_APP_DEMO_DB_SETTINGS,
            tags: process.env.REACT_APP_DEMO_DB_TAGS,
            transactions: process.env.REACT_APP_DEMO_DB_TRANSACTIONS
          }
        })
      )
      yield syncSaga()
    }
    yield put(demoUser())
    yield put(userLoggedIn())
  }
}

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
  yield syncSaga()
  yield isUserLoggedIn()
}

export function* signOutSaga() {
  yield call(AccountsStorage.destroy)
  yield call(SettingsStorage.destroy)
  yield call(TagsStorage.destroy)
  yield call(TransactionsStorage.destroy)
  yield call([localStorage, 'clear'])

  yield put(signOutComplete())
  yield isDemoUser()
  yield loadSetting()
}

export default [
  takeLatest(sendCode, sendCodeSaga),
  takeLatest(verifyCode, verifyCodeSaga),
  takeLatest(finishAuth, finishAuthSaga),
  takeLatest(signOut, signOutSaga)
]
