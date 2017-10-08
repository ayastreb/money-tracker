import { handleActions } from 'redux-actions'
import { userLoggedIn, signOut, signOutComplete } from '../actions/user'

export default handleActions(
  {
    [userLoggedIn]: state => ({ ...state, isAuthenticated: true }),
    [signOut]: state => ({ ...state, isSignOutRunning: true }),
    [signOutComplete]: state => ({
      isAuthenticated: false,
      isSignOutRunning: false,
      isSignOutComplete: true
    })
  },
  {
    isAuthenticated: false,
    isSignOutRunning: false,
    isSignOutComplete: false
  }
)
