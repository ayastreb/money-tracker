import { CURRENCY } from '../constants/currency'
import { persistAccount, deleteAccount } from '../util/storage/accounts'

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE'
export function createAccount(name, group, balance) {
  return async dispatch => {
    const account = {
      id: `A/${Date.now()}`,
      name,
      group,
      balance: Object.keys(balance).reduce((result, code) => {
        result[code] = balance[code] * Math.pow(10, CURRENCY[code].exp)
        return result
      }, {})
    }
    dispatch({ type: CREATE_ACCOUNT, account })
    try {
      await persistAccount(account)
    } catch (error) {
      dispatch({
        type: CREATE_ACCOUNT_FAILURE,
        id: account.id,
        name,
        group,
        balance,
        error
      })
    }
  }
}

export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'
export const REMOVE_ACCOUNT_FAILURE = 'REMOVE_ACCOUNT_FAILURE'
export function removeAccount(id) {
  return async dispatch => {
    dispatch({ type: REMOVE_ACCOUNT, id })
    try {
      await deleteAccount(id)
    } catch (error) {
      dispatch({ type: REMOVE_ACCOUNT_FAILURE, error })
    }
  }
}
