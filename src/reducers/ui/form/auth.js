import { handleActions } from 'redux-actions'
import {
  changeEmail,
  changeCode,
  sendCode,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure
} from '../../../actions/ui/form/auth'

export default handleActions(
  {
    [changeEmail]: (state, { payload }) => ({ ...state, email: payload }),
    [changeCode]: (state, { payload }) => ({ ...state, code: payload }),
    [sendCode]: state => ({ ...state, isSendingCode: true }),
    [sendCodeSuccess]: state => ({
      ...state,
      isSendingCode: false,
      isCodeSent: true
    }),
    [sendCodeFailure]: (state, { payload }) => ({
      ...state,
      isSendingCode: false,
      error: payload.message
    }),
    [verifyCode]: state => ({
      ...state,
      isVerifyingCode: true
    }),
    [verifyCodeSuccess]: state => ({
      ...state,
      isVerifyingCode: false,
      isCodeValid: true
    }),
    [verifyCodeFailure]: (state, { payload }) => ({
      ...state,
      isVerifyingCode: false,
      error: payload.message
    })
  },
  {
    error: null,
    email: '',
    code: '',
    isSendingCode: false,
    isCodeSent: false,
    isVerifyingCode: false,
    isCodeValid: false
  }
)
