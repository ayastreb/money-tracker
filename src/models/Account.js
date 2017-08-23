import { CURRENCY } from '../constants/currency'

export default class Account {
  static groups = {
    cash: 'Cash',
    bank: 'Bank',
    deposit: 'Deposit',
    credit: 'Credit',
    asset: 'Asset'
  }

  static defaultGroup = 'cash'

  static groupAsDropdownOptions() {
    return Object.keys(this.groups).map(key => ({
      key,
      value: key,
      text: this.groups[key]
    }))
  }

  /**
   * Internally we store balance as integer represented in currency's minimal
   * units (cents for dollar, pennies for pound, etc). When we get data from form,
   * we need to convert balance to minimal units, e.g.
   * 9.95 USD => 995 cents
   * 1000 JPY => 1000 yen
   *
   * @param {object} data
   * @return {Account}
   */
  static fromForm = data =>
    new Account({
      ...data,
      balance: Object.keys(data.balance).reduce((cents, code) => {
        cents[code] = Math.round(
          data.balance[code] * Math.pow(10, CURRENCY[code].exp)
        )
        return cents
      }, {})
    })

  /**
   * When we want to load account into the form we need to convert balance back
   * to float, human-readable, value, e.g.
   * 995 cents => 9.95 USD
   * 1000 yen  => 1000 JPY
   *
   * @return {object}
   */
  balanceToForm = () =>
    Object.keys(this.balance).reduce((result, code) => {
      result[code] = Number(
        this.balance[code] / Math.pow(10, CURRENCY[code].exp)
      ).toFixed(CURRENCY[code].exp)

      return result
    }, {})

  constructor({ id, name, group, balance }) {
    this.id = id || `A${Date.now()}`
    this.name = name
    this.group = group
    this.balance = balance
  }

  toJSON = () => ({
    name: this.name,
    group: this.group,
    balance: this.balance
  })

  toState = () => ({
    id: this.id,
    currencies: Object.keys(this.balance),
    ...this.toJSON()
  })
}
