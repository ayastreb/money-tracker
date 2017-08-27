import reducer from './user'
import { authSuccess } from '../actions/ui/auth'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({ isAuthenticated: false })
})

it('changes flag when user is authenticated', () => {
  expect(reducer({ isAuthenticated: false }, authSuccess())).toEqual({
    isAuthenticated: true
  })
})
