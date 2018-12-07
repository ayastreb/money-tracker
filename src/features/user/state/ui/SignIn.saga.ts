import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import Auth from 'util/auth';
import { getSignInEmail, getSignInCode } from './SignIn.selector';
import * as SignIn from './SignIn.action';
import { syncSaga } from 'sagas/sync';
import { loadSetting } from 'sagas/settings';
import { isUserLoggedIn } from 'features/user/state/User.saga';

export function* sendCodeSaga() {
  const email = yield select(getSignInEmail);
  try {
    yield call(Auth.sendCode, email);
    yield put(SignIn.sendCodeSuccess());
  } catch (error) {
    yield put(SignIn.sendCodeFailure(error));
  }
}

export function* verifyCodeSaga() {
  const email = yield select(getSignInEmail);
  const code = yield select(getSignInCode);
  try {
    yield call(Auth.verifyCode, email, code);
    yield put(SignIn.verifyCodeSuccess());
  } catch (error) {
    yield put(SignIn.verifyCodeFailure(error));
  }
}

export function* finishAuthSaga() {
  const accessToken = yield call(Auth.parseHash);
  const userInfo = yield call(Auth.getUserInfo, accessToken);
  yield call([localStorage, 'setItem'], 'userInfo', JSON.stringify(userInfo));

  yield loadSetting();
  yield syncSaga();
  yield isUserLoggedIn();
}

export default [
  takeLatest(getType(SignIn.sendCode), sendCodeSaga),
  takeLatest(getType(SignIn.verifyCode), verifyCodeSaga),
  takeLatest(getType(SignIn.finishAuth), finishAuthSaga)
];
