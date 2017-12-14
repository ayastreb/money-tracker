import { handleActions } from 'redux-actions'
import {
  userLoggedIn,
  demoUser,
  signOut,
  signOutComplete
} from '../actions/user'

export default handleActions(
  {
    [userLoggedIn]: state => ({ ...state, isAuthenticated: true }),
    [demoUser]: state => ({ ...state, isDemo: true }),
    [signOut]: state => ({ ...state, isSignOutRunning: true }),
    [signOutComplete]: state => ({
      ...state,
      isAuthenticated: false,
      isSignOutRunning: false,
      isSignOutComplete: true
    })
  },
  {
    isDemo: false,
    isAuthenticated: false,
    isSignOutRunning: false,
    isSignOutComplete: false
  }
)
