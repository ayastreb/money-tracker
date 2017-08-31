import { createActions } from 'redux-actions'

export const {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  saveAccountSuccess,
  removeAccount,
  removeAccountSuccess,
  changeBalance
} = createActions(
  'LOAD_ACCOUNTS',
  'LOAD_ACCOUNTS_SUCCESS',
  'SAVE_ACCOUNT',
  'SAVE_ACCOUNT_FAILURE',
  'SAVE_ACCOUNT_SUCCESS',
  'REMOVE_ACCOUNT',
  'REMOVE_ACCOUNT_SUCCESS',
  'CHANGE_BALANCE'
)
