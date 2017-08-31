import {
  changeEmail,
  changeCode,
  sendCode,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure,
  finishAuth
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

it('creates send code  action', () => {
  expect(sendCode()).toEqual({
    type: 'SEND_CODE'
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

it('creates verify code  action', () => {
  expect(verifyCode()).toEqual({
    type: 'VERIFY_CODE'
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

it('creates finish auth action', () => {
  expect(finishAuth()).toEqual({
    type: 'FINISH_AUTH'
  })
})
