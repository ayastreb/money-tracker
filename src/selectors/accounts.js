import { createSelector } from 'reselect'
import { getBaseCurrency, getExchangeRate } from './currency'
import Account from '../entities/Account'
import Currency from '../entities/Currency'
import EntityMap from '../entities/EntityMap'

const insertCurrencies = account => ({
  ...account,
  currencies: Object.keys(account.balance)
})

export const getAccountsMap = state =>
  EntityMap.apply(state.entities.accounts, insertCurrencies)

export const getAccount = id =>
  createSelector(getAccountsMap, accounts => EntityMap.get(accounts, id))

export const getAccountsList = state =>
  EntityMap.map(state.entities.accounts, insertCurrencies)

export const getAccountsAsOptions = state =>
  EntityMap.map(state.entities.accounts, account => ({
    key: account.id,
    value: account.id,
    text: account.name
  }))

export const getUsedCurrency = createSelector(getAccountsList, accounts => [
  ...new Set(accounts.map(account => account.currencies))
])

export const getGroupedAccounts = createSelector(
  getAccountsList,
  getBaseCurrency,
  getExchangeRate,
  (accounts, base, rate) =>
    accounts.reduce((grouped, account) => {
      const group = account.group
      if (!grouped[group]) {
        grouped[group] = {
          name: Account.groupName(group),
          accounts: [],
          total: 0
        }
      }

      grouped[group].accounts.push(account)
      grouped[group].total += getBaseTotal(account, base, rate)

      return grouped
    }, {})
)

export const getNetWorth = createSelector(
  getAccountsList,
  getBaseCurrency,
  getExchangeRate,
  (accounts, base, rate) =>
    accounts.reduce(
      (netWorth, account) => netWorth + getBaseTotal(account, base, rate),
      0
    )
)

export const getBaseTotal = (account, base, rate) =>
  account.currencies.reduce(
    (total, code) =>
      Math.floor(
        total + Currency.convert(account.balance[code], rate[code], base, code)
      ),
    0
  )
