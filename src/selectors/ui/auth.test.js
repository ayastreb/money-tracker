import { getAuthCode, getAuthEmail } from './auth'

it('gets auth code', () => {
  const state = {
    ui: {
      auth: {
        code: 'foo',
        email: 'bar@foo'
      }
    }
  }
  expect(getAuthCode(state)).toEqual('foo')
})

it('gets auth email', () => {
  const state = {
    ui: {
      auth: {
        code: 'foo',
        email: 'bar@foo'
      }
    }
  }
  expect(getAuthEmail(state)).toEqual('bar@foo')
})
