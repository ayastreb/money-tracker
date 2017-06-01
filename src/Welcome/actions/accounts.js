import { currencyExponent } from '../../data/currency'
import { CREATE_ACCOUNT, REMOVE_ACCOUNT } from '../constants/accounts'

export function createAccount(data) {
  const balance = {}
  for (let code of Object.keys(data.balance)) {
    balance[code] = data.balance[code] * Math.pow(10, currencyExponent(code))
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
