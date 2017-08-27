import {
  changeEmail,
  changeCode,
  sendCodeRequest,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCodeRequest,
  verifyCodeSuccess,
  verifyCodeFailure,
  authSuccess
} from './auth'

it('creates change email action', () => {
  expect(changeEmail('foo@example.org')).toEqual({
    type: 'CHANGE_EMAIL',
    payload: 'foo@example.org'
  })
})

it('creates change code action', () => {
  expect(changeCode('bar')).toEqual({
    type: 'CHANGE_CODE',
    payload: 'bar'
  })
})

it('creates send code request action', () => {
  expect(sendCodeRequest()).toEqual({
    type: 'SEND_CODE_REQUEST'
  })
})

it('creates send code success action', () => {
  expect(sendCodeSuccess()).toEqual({
    type: 'SEND_CODE_SUCCESS'
  })
})

it('creates send code failure action', () => {
  expect(sendCodeFailure()).toEqual({
    type: 'SEND_CODE_FAILURE'
  })
})

it('creates verify code request action', () => {
  expect(verifyCodeRequest()).toEqual({
    type: 'VERIFY_CODE_REQUEST'
  })
})

it('creates verify code success action', () => {
  expect(verifyCodeSuccess()).toEqual({
    type: 'VERIFY_CODE_SUCCESS'
  })
})

it('creates verify code failure action', () => {
  expect(verifyCodeFailure()).toEqual({
    type: 'VERIFY_CODE_FAILURE'
  })
})

it('creates auth success action', () => {
  expect(authSuccess()).toEqual({
    type: 'AUTH_SUCCESS'
  })
})
