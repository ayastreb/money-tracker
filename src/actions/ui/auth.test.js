import {
  CHANGE_EMAIL,
  CHANGE_CODE,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILURE,
  FINISH_AUTH_SUCCESS,
  FINISH_AUTH_FAILURE,
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
} from './auth'
import {
  mockStore,
  rejectPromise,
  resolvePromise
} from '../../util/test/helper'
import * as auth from '../../util/auth'
import { LocalStorageMock } from '../../util/test/helper'

global.localStorage = new LocalStorageMock()

let store

beforeEach(() => (store = mockStore()))

it('creates CHANGE_EMAIL action', () => {
  expect(changeEmail('foo@example.org')).toEqual({
    type: CHANGE_EMAIL,
    email: 'foo@example.org'
  })
})

it('creates CHANGE_CODE action', () => {
  expect(changeCode('bar')).toEqual({
    type: CHANGE_CODE,
    code: 'bar'
  })
})

describe('sending auth code', () => {
  it('creates SEND_CODE_SUCCESS action', () => {
    auth.sendAuthCode = jest.fn(resolvePromise(true))

    return store.dispatch(sendCode('foo@example.org')).then(() => {
      expect(store.getActions()).toEqual([
        { type: SEND_CODE_REQUEST },
        { type: SEND_CODE_SUCCESS, response: true }
      ])
    })
  })

  it('creates SEND_CODE_FAILURE action when failed to send code', () => {
    const error = new Error('not sent')
    auth.sendAuthCode = jest.fn(rejectPromise(error))

    return store.dispatch(sendCode('foo@example.org')).then(() => {
      expect(store.getActions()).toEqual([
        { type: SEND_CODE_REQUEST },
        { type: SEND_CODE_FAILURE, error: 'not sent' }
      ])
    })
  })
})

describe('verifying auth code', () => {
  it('creates VERIFY_CODE_SUCCESS action', () => {
    auth.verifyAuthCode = jest.fn(resolvePromise(true))

    return store.dispatch(verifyCode('foo@example.org', 'bar')).then(() => {
      expect(store.getActions()).toEqual([
        { type: VERIFY_CODE_REQUEST },
        { type: VERIFY_CODE_SUCCESS, response: true }
      ])
    })
  })

  it('creates VERIFY_CODE_FAILURE action when failed to verify code', () => {
    const error = new Error('not verified')
    auth.verifyAuthCode = jest.fn(rejectPromise(error))

    return store.dispatch(verifyCode('foo@example.org', 'bar')).then(() => {
      expect(store.getActions()).toEqual([
        { type: VERIFY_CODE_REQUEST },
        { type: VERIFY_CODE_FAILURE, error: 'not verified' }
      ])
    })
  })
})

describe('finishing auth', () => {
  it('creates FINISH_AUTH_SUCCESS action', () => {
    auth.parseHash = jest.fn(resolvePromise({ couchDB: {} }))

    return store.dispatch(finishAuth('foo', true)).then(() => {
      expect(store.getActions()).toEqual([
        { type: FINISH_AUTH_SUCCESS, response: { couchDB: {} } }
      ])
    })
  })

  it('creates FINISH_AUTH_FAILURE when failed to parse hash', () => {
    const error = new Error('not parsed')
    auth.parseHash = jest.fn(rejectPromise(error))

    return store.dispatch(finishAuth('foo', true)).then(() => {
      expect(store.getActions()).toEqual([
        { type: FINISH_AUTH_FAILURE, error: 'not parsed' }
      ])
    })
  })
})
