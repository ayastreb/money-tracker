import { createActions } from 'redux-actions';

export const {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  saveAccountSuccess,
  updateAccount,
  removeAccount,
  removeAccountRequest,
  removeAccountStart,
  removeAccountItemProcessed,
  removeAccountFailure,
  removeAccountSuccess
} = createActions(
  'LOAD_ACCOUNTS',
  'LOAD_ACCOUNTS_SUCCESS',
  'SAVE_ACCOUNT',
  'SAVE_ACCOUNT_FAILURE',
  'SAVE_ACCOUNT_SUCCESS',
  'UPDATE_ACCOUNT',
  'REMOVE_ACCOUNT',
  'REMOVE_ACCOUNT_REQUEST',
  'REMOVE_ACCOUNT_START',
  'REMOVE_ACCOUNT_ITEM_PROCESSED',
  'REMOVE_ACCOUNT_FAILURE',
  'REMOVE_ACCOUNT_SUCCESS'
);
