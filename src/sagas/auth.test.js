import { select, call, put } from 'redux-saga/effects'
import {
  sendCodeSuccess,
  sendCodeFailure,
  verifyCodeSuccess,
  verifyCodeFailure,
  finishAuth
} from '../actions/ui/form/auth'
import { sendCodeSaga, verifyCodeSaga } from './auth'
import { getAuthEmail, getAuthCode } from '../selectors/ui/form/auth'
import Auth from '../util/auth'

describe('sending auth code', () => {
  it('sends code successfully', () => {
    const gen = sendCodeSaga()
    expect(gen.next().value).toEqual(select(getAuthEmail))
    expect(gen.next('foo@example').value).toEqual(
      call(Auth.sendCode, 'foo@example')
    )
    expect(gen.next().value).toEqual(put(sendCodeSuccess()))
    expect(gen.next().done).toBeTruthy()
  })

  it('send code failure', () => {
    const gen = sendCodeSaga()
    expect(gen.next().value).toEqual(select(getAuthEmail))
    expect(gen.next('foo@example').value).toEqual(
      call(Auth.sendCode, 'foo@example')
    )
    const error = new Error('Failed')
    expect(gen.throw(error).value).toEqual(put(sendCodeFailure(error)))
    expect(gen.next().done).toBeTruthy()
  })
})

describe('verifying auth code', () => {
  it('verify code successfully', () => {
    const gen = verifyCodeSaga()
    expect(gen.next().value).toEqual(select(getAuthEmail))
    expect(gen.next('foo@example').value).toEqual(select(getAuthCode))
    expect(gen.next('code').value).toEqual(
      call(Auth.verifyCode, 'foo@example', 'code')
    )
    expect(gen.next().value).toEqual(put(verifyCodeSuccess()))
    expect(gen.next().done).toBeTruthy()
  })

  it('verify code failure', () => {
    const gen = verifyCodeSaga()
    expect(gen.next().value).toEqual(select(getAuthEmail))
    expect(gen.next('foo@example').value).toEqual(select(getAuthCode))
    expect(gen.next('code').value).toEqual(
      call(Auth.verifyCode, 'foo@example', 'code')
    )
    const error = new Error('failure')
    expect(gen.throw(error).value).toEqual(put(verifyCodeFailure(error)))
    expect(gen.next().done).toBeTruthy()
  })
})
