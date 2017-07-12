import reducer from './'
import {
  CHANGE_EMAIL,
  CHANGE_CODE,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILURE
} from '../../../actions/ui/auth'

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
  expect(
    reducer({ email: 'foo' }, { type: CHANGE_EMAIL, email: 'foo@example' })
  ).toEqual({ email: 'foo@example' })
})

it('changes code', () => {
  expect(reducer({ code: 'bar' }, { type: CHANGE_CODE, code: 'baz' })).toEqual({
    code: 'baz'
  })
})

it('shows loader when send code requested', () => {
  expect(
    reducer({ isSendingCode: false }, { type: SEND_CODE_REQUEST })
  ).toEqual({
    isSendingCode: true
  })
})

it('changes isCodeSent flag when code was sent', () => {
  expect(
    reducer(
      { isSendingCode: true, isCodeSent: false },
      { type: SEND_CODE_SUCCESS }
    )
  ).toEqual({
    isSendingCode: false,
    isCodeSent: true
  })
})

it('shows error if code was not sent', () => {
  expect(
    reducer(
      { isSendingCode: true, error: null },
      { type: SEND_CODE_FAILURE, error: 'there was an error' }
    )
  ).toEqual({
    isSendingCode: false,
    error: 'there was an error'
  })
})

it('shows loader when code verification is requested', () => {
  expect(
    reducer({ isVerifyingCode: false }, { type: VERIFY_CODE_REQUEST })
  ).toEqual({
    isVerifyingCode: true
  })
})

it('changes isCodeValid flag when code was verified', () => {
  expect(
    reducer(
      { isVerifyingCode: true, isCodeValid: false },
      { type: VERIFY_CODE_SUCCESS }
    )
  ).toEqual({
    isVerifyingCode: false,
    isCodeValid: true
  })
})

it('shows error if code was not verified', () => {
  expect(
    reducer(
      { isVerifyingCode: true, error: null },
      { type: VERIFY_CODE_FAILURE, error: 'code not valid' }
    )
  ).toEqual({
    isVerifyingCode: false,
    error: 'code not valid'
  })
})
