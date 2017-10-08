import reducer from './user'
import { userLoggedIn } from '../actions/user'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    isAuthenticated: false,
    isSignOutRunning: false,
    isSignOutComplete: false
  })
})

it('changes flag when user is authenticated', () => {
  expect(reducer({ isAuthenticated: false }, userLoggedIn())).toEqual({
    isAuthenticated: true
  })
})
