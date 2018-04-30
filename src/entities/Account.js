import pick from 'lodash/pick'
import Currency from './Currency'

const GROUP = {
  cash: 'Cash',
  bank: 'Bank Account',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

export const DELETE_STRATEGY_ARCHIVE = 0
export const DELETE_STRATEGY_CLEANUP = 1
export const DELETE_STRATEGY_MOVE = 2

const Account = {
  defaultGroup: 'cash',
  groupOptions() {
    return Object.keys(GROUP).map(key => ({
      key,
      value: key,
      text: GROUP[key]
    }))
  },
  defaultDeleteStrategy: DELETE_STRATEGY_ARCHIVE,
  deleteStartegies(hasMultipleAccounts = false) {
    const stratgies = [
      {
        key: DELETE_STRATEGY_ARCHIVE,
        value: DELETE_STRATEGY_ARCHIVE,
        text: 'Archive account, keep transactions as is'
      },
      {
        key: DELETE_STRATEGY_CLEANUP,
        value: DELETE_STRATEGY_CLEANUP,
        text: 'Delete transactions with account'
      }
    ]
    if (hasMultipleAccounts) {
      stratgies.push({
        key: DELETE_STRATEGY_MOVE,
        value: DELETE_STRATEGY_MOVE,
        text: 'Move transactions to another account'
      })
    }

    return stratgies
  },
  groupName(code) {
    return GROUP[code]
  },
  fromForm(data) {
    return {
      ...pick(data, Account.persistentKeys()),
      id: data.id || `A${Date.now()}`,
      balance: Object.keys(data.balance).reduce((acc, code) => {
        acc[code] = Currency.toInt(
          data.balance[code] !== '' ? data.balance[code] : 0,
          code
        )
        return acc
      }, {})
    }
  },
  toForm(data) {
    return {
      ...data,
      balance: Object.keys(data.balance).reduce((acc, code) => {
        acc[code] = Currency.toFloat(data.balance[code], code, false)
        return acc
      }, {})
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      ...pick(data, Account.persistentKeys())
    }
  },
  toStorage(data) {
    return pick(data, Account.persistentKeys())
  },
  persistentKeys() {
    return [
      'name',
      'group',
      'balance',
      'currencies',
      'on_dashboard',
      'archived'
    ]
  },
  mutateBalance(account, currency, amount) {
    return {
      ...account,
      currencies: [...new Set([...account.currencies, currency])],
      balance: {
        ...account.balance,
        [currency]: parseInt(account.balance[currency] || 0, 10) + amount
      }
    }
  }
}

export default Account
