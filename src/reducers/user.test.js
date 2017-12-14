import reducer from './user'
import { userLoggedIn, demoUser } from '../actions/user'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    isDemo: false,
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

it('changes flag when user is demo', () => {
  expect(reducer({ isDemo: false }, demoUser())).toEqual({
    isDemo: true
  })
})
