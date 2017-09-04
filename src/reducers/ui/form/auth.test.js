import reducer from './auth'
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

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    error: null,
    email: '',
    code: '',
    isSendingCode: false,
    isCodeSent: false,
    isVerifyingCode: false,
    isCodeValid: false
  })
})

it('changes email', () => {
  expect(reducer({ email: 'foo' }, changeEmail('foo@example'))).toEqual({
    email: 'foo@example'
  })
})

it('changes code', () => {
  expect(reducer({ code: 'bar' }, changeCode('baz'))).toEqual({
    code: 'baz'
  })
})

it('shows loader when send code requested', () => {
  expect(reducer({ isSendingCode: false }, sendCode())).toEqual({
    isSendingCode: true
  })
})

it('changes isCodeSent flag when code was sent', () => {
  expect(
    reducer({ isSendingCode: true, isCodeSent: false }, sendCodeSuccess())
  ).toEqual({
    isSendingCode: false,
    isCodeSent: true
  })
})

it('shows error if code was not sent', () => {
  expect(
    reducer(
      { isSendingCode: true, error: null },
      sendCodeFailure(new Error('there was an error'))
    )
  ).toEqual({
    isSendingCode: false,
    error: 'there was an error'
  })
})

it('shows loader when code verification is requested', () => {
  expect(reducer({ isVerifyingCode: false }, verifyCode())).toEqual({
    isVerifyingCode: true
  })
})

it('changes isCodeValid flag when code was verified', () => {
  expect(
    reducer({ isVerifyingCode: true, isCodeValid: false }, verifyCodeSuccess())
  ).toEqual({
    isVerifyingCode: false,
    isCodeValid: true
  })
})

it('shows error if code was not verified', () => {
  expect(
    reducer(
      { isVerifyingCode: true, error: null },
      verifyCodeFailure(new Error('code not valid'))
    )
  ).toEqual({
    isVerifyingCode: false,
    error: 'code not valid'
  })
})
