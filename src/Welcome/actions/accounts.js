import { CURRENCY } from '../constants'

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'

export function createAccount(data) {
  const balance = {}
  for (let code of Object.keys(data.balance)) {
    if (data.balance[code] !== undefined) {
      balance[code] = data.balance[code] * Math.pow(10, CURRENCY[code].exp)
    }
  }

  return {
    type: CREATE_ACCOUNT,
    account: {
      id: Date.now(),
      name: data.accountName,
      type: data.accountType,
      balance
    }
  }
}

export function removeAccount(id) {
  return {
    type: REMOVE_ACCOUNT,
    id
  }
}
