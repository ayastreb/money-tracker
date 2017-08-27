import { createActions } from 'redux-actions'
import { showError } from './ui/error'
import { setPendingChangesFlag } from './sync'
import accounts from '../util/storage/accounts'

export const {
  loadAccountsSuccess,
  saveAccountRequest,
  saveAccountFailure,
  removeAccountRequest,
  changeBalanceRequest
} = createActions(
  {
    CHANGE_BALANCE_REQUEST: (id, currency, amount) => ({ id, currency, amount })
  },
  'LOAD_ACCOUNTS_SUCCESS',
  'SAVE_ACCOUNT_REQUEST',
  'SAVE_ACCOUNT_FAILURE',
  'REMOVE_ACCOUNT_REQUEST'
)

export function syncAccounts() {
  return dispatch => accounts.sync().then(() => dispatch(loadAccounts()))
}

export function loadAccounts() {
  return dispatch => {
    return accounts
      .loadAll()
      .then(accounts => dispatch(loadAccountsSuccess(accounts)))
      .catch(error => dispatch(showError(error)))
  }
}

export function saveAccount(account) {
  return dispatch => {
    dispatch(saveAccountRequest(account))

    return accounts
      .save(account)
      .then(() => dispatch(setPendingChangesFlag()))
      .catch(error => {
        dispatch(saveAccountFailure(account.id))
        dispatch(showError(error))
      })
  }
}

export function removeAccount(id) {
  return dispatch => {
    dispatch(removeAccountRequest(id))

    return accounts
      .remove(id)
      .then(() => dispatch(setPendingChangesFlag()))
      .catch(error => dispatch(showError(error)))
  }
}

export function changeBalance(id, currency, amount) {
  return dispatch => {
    dispatch(changeBalanceRequest(id, currency, amount))

    return accounts
      .changeBalance(id, currency, amount)
      .catch(error => dispatch(showError(error)))
  }
}
