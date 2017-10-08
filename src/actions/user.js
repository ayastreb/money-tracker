import { createActions } from 'redux-actions'

export const { userLoggedIn, signOut, signOutComplete } = createActions(
  'USER_LOGGED_IN',
  'SIGN_OUT',
  'SIGN_OUT_COMPLETE'
)
