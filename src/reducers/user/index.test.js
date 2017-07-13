import reducer from './'
import { LocalStorageMock } from '../../util/test/helper'
import { FINISH_AUTH_SUCCESS } from '../../actions/ui/auth'

global.localStorage = new LocalStorageMock()

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({ isAuthenticated: false })
})

it('changes flag when user is authenticated', () => {
  expect(
    reducer({ isAuthenticated: false }, { type: FINISH_AUTH_SUCCESS })
  ).toEqual({ isAuthenticated: true })
})
