import { createActions } from 'redux-actions'

export const {
  changeEmail,
  changeCode,
  sendCode,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure,
  finishAuth
} = createActions(
  'CHANGE_EMAIL',
  'CHANGE_CODE',
  'SEND_CODE',
  'SEND_CODE_SUCCESS',
  'SEND_CODE_FAILURE',
  'VERIFY_CODE',
  'VERIFY_CODE_SUCCESS',
  'VERIFY_CODE_FAILURE',
  'FINISH_AUTH'
)
