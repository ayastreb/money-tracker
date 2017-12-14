import { createActions } from 'redux-actions'

export const {
  userLoggedIn,
  demoUser,
  signOut,
  signOutComplete
} = createActions(
  'USER_LOGGED_IN',
  'DEMO_USER',
  'SIGN_OUT',
  'SIGN_OUT_COMPLETE'
)
