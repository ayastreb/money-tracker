import { createSelector } from 'reselect'
import { CURRENCY } from '../constants/currency'
import { ACCOUNT_GROUP } from '../constants/account'

const baseCurrencySelector = state => state.settings.currency.base
const exchangeRateSelector = state => state.settings.exchangeRate
const accountsSelector = state => state.accounts.byId
const accountsIdsSelector = state => state.accounts.allIds

export const getAccountsAsOptions = createSelector(
  accountsIdsSelector,
  accountsSelector,
  (accountsIds, accounts) =>
    accountsIds.map(id => ({ key: id, value: id, text: accounts[id].name }))
)

export const getGroupedAccounts = createSelector(
  accountsIdsSelector,
  accountsSelector,
  baseCurrencySelector,
  exchangeRateSelector,
  (accountsIds, accounts, base, exchangeRate) =>
    accountsIds.reduce((grouped, id) => {
      const group = accounts[id].group
      if (!grouped[group]) {
        grouped[group] = { name: ACCOUNT_GROUP[group], accounts: [], total: 0 }
      }

      grouped[group].accounts.push(accounts[id])
      grouped[group].total += accountBaseTotal(accounts[id], base, exchangeRate)

      return grouped
    }, {})
)

export const getNetWorth = createSelector(
  accountsIdsSelector,
  accountsSelector,
  baseCurrencySelector,
  exchangeRateSelector,
  (accountsIds, accounts, base, exchangeRate) =>
    accountsIds.reduce(
      (netWorth, id) =>
        netWorth + accountBaseTotal(accounts[id], base, exchangeRate),
      0
    )
)

const accountBaseTotal = (account, base, exchangeRate) =>
  account.currencies.reduce(
    (total, foreign) =>
      Math.floor(
        total +
          account.balance[foreign] /
            exchangeRate[foreign] *
            Math.pow(10, CURRENCY[base].exp - CURRENCY[foreign].exp)
      ),
    0
  )
