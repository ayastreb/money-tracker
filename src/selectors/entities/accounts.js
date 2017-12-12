import { createSelector } from 'reselect'
import { getBaseCurrency, getExchangeRate } from '../settings'
import Account from '../../entities/Account'
import Currency from '../../entities/Currency'
import EntityMap from '../../entities/EntityMap'

export const getAccountsMap = state => state.entities.accounts

export const getAccount = id =>
  createSelector(getAccountsMap, accounts => EntityMap.get(accounts, id))

export const getAccountByName = name =>
  createSelector(getAccountsList, accounts =>
    accounts.find(account => account.name === name)
  )

export const getAccountsList = state =>
  EntityMap.map(state.entities.accounts, account => ({ ...account }))

export const getDashboardAccountsList = createSelector(
  getAccountsList,
  accounts => accounts.filter(account => account.on_dashboard)
)

export const getAccountsAsOptions = state =>
  EntityMap.map(state.entities.accounts, account => ({
    key: account.id,
    value: account.id,
    text: account.name,
    description: Account.groupName(account.group)
  }))

export const getAccountsNameMap = createSelector(getAccountsList, accounts =>
  accounts.reduce((acc, account) => {
    acc[account.id] = account.name
    return acc
  }, {})
)

export const getAccountsCurrencyMap = createSelector(
  getAccountsList,
  accounts =>
    accounts.reduce((acc, account) => {
      acc[account.id] = account.currencies
      return acc
    }, {})
)

export const getAccountsCurrencyList = createSelector(
  getAccountsList,
  accounts =>
    accounts.reduce(
      (currencies, account) =>
        currencies.concat(
          account.currencies.filter(code => !currencies.includes(code))
        ),
      []
    )
)

const groupAccounts = (accounts, base, rate) =>
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

export const getDashboardGroupedAccounts = createSelector(
  getDashboardAccountsList,
  getBaseCurrency,
  getExchangeRate,
  groupAccounts
)

export const getGroupedAccounts = createSelector(
  getAccountsList,
  getBaseCurrency,
  getExchangeRate,
  groupAccounts
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

const getBaseTotal = (account, base, rate) =>
  account.currencies.reduce(
    (total, code) =>
      Math.floor(
        total + Currency.convert(account.balance[code], rate[code], base, code)
      ),
    0
  )
