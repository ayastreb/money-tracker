import { createSelector } from 'reselect'
import { CURRENCY } from '../constants/currency'

const baseCurrencySelector = state => state.settings.currency.base
const exchangeRateSelector = state => state.settings.exchangeRate
const accountsSelector = state => state.accounts.byId

export const getGroupedAccounts = createSelector(
  baseCurrencySelector,
  exchangeRateSelector,
  accountsSelector,
  (base, exchangeRate, accounts) =>
    Object.keys(accounts).reduce((result, id) => {
      const account = accounts[id]
      const group = account.group
      if (!result[group]) result[group] = { accounts: [], total: 0 }

      result[group].accounts.push(account)
      result[group].total = Object.keys(account.balance).reduce(
        (total, code) =>
          total +
          account.balance[code] /
            exchangeRate[code] *
            Math.pow(10, CURRENCY[base].exp - CURRENCY[code].exp),
        result[group].total
      )

      return result
    }, {})
)
