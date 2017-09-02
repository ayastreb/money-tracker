import Currency from './Currency'

const GROUP = {
  cash: 'Cash',
  bank: 'Bank Account',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

const Account = {
  defaultGroup: 'cash',
  groupOptions() {
    return Object.keys(GROUP).map(key => ({
      key,
      value: key,
      text: GROUP[key]
    }))
  },
  groupName(code) {
    return GROUP[code]
  },
  fromForm(data) {
    return {
      ...data,
      id: data.id || `A${Date.now()}`,
      balance: Object.keys(data.balance).reduce((acc, code) => {
        acc[code] = Currency.toInt(data.balance[code], code)
        return acc
      }, {})
    }
  },
  toForm(data) {
    return {
      ...data,
      balance: Object.keys(data.balance).reduce((acc, code) => {
        acc[code] = Currency.toFloat(data.balance[code], code)
        return acc
      }, {})
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      ...Account.toStorage(data)
    }
  },
  toStorage(data) {
    return {
      name: data.name,
      group: data.group,
      balance: data.balance
    }
  },
  mutateBalance(account, currency, amount) {
    return {
      ...account,
      balance: {
        ...account.balance,
        [currency]: parseInt(account.balance[currency], 10) + amount
      }
    }
  }
}

export default Account
