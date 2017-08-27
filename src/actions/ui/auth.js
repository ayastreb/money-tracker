import { createActions } from 'redux-actions'
import { loadSettings } from '../settings'
import { sync } from '../sync'
import auth from '../../util/auth'

export const {
  changeEmail,
  changeCode,
  sendCodeRequest,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCodeRequest,
  verifyCodeSuccess,
  verifyCodeFailure,
  authSuccess
} = createActions(
  'CHANGE_EMAIL',
  'CHANGE_CODE',
  'SEND_CODE_REQUEST',
  'SEND_CODE_SUCCESS',
  'SEND_CODE_FAILURE',
  'VERIFY_CODE_REQUEST',
  'VERIFY_CODE_SUCCESS',
  'VERIFY_CODE_FAILURE',
  'AUTH_SUCCESS'
)

export function sendCode(email) {
  return dispatch => {
    dispatch(sendCodeRequest())

    return auth
      .sendCode(email)
      .then(() => dispatch(sendCodeSuccess()))
      .catch(error => dispatch(sendCodeFailure(error)))
  }
}

export function verifyCode(email, code) {
  return dispatch => {
    dispatch(verifyCodeRequest())

    return auth
      .verifyCode(email, code)
      .then(() => dispatch(verifyCodeSuccess()))
      .catch(error => dispatch(verifyCodeFailure(error)))
  }
}

export function finishSignin(hash) {
  return dispatch =>
    auth
      .parseHash(hash)
      .then(accessToken => auth.getUserInfo(accessToken))
      .then(info => localStorage.setItem('userInfo', JSON.stringify(info)))
      .then(() => dispatch(loadSettings()))
      .then(() => dispatch(sync()))
      .then(() => dispatch(authSuccess()))
}
