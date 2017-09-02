import { createSelector } from 'reselect'
import { EXPENSE, INCOME } from '../../entities/Transaction'
import { getAccountsMap } from '../accounts'
import { getBaseCurrency } from '../currency'
import EntityMap from '../../entities/EntityMap'

const formSelector = state => state.ui.transactionForm
const defaultAccountSelector = state => state.entities.accounts.keys[0]
const arrayToOptions = code => ({
  key: code,
  value: code,
  text: code
})

export const getExpenseTagOptions = state =>
  state.entities.tags[EXPENSE].map(arrayToOptions)

export const getIncomeTagOptions = state =>
  state.entities.tags[INCOME].map(arrayToOptions)

export const getAccountId = createSelector(
  formSelector,
  defaultAccountSelector,
  (form, defaultAccountId) => form.accountId || defaultAccountId
)

export const getLinkedAccountId = createSelector(
  formSelector,
  defaultAccountSelector,
  (form, defaultAccountId) => form.linkedAccountId || defaultAccountId
)

const getAccountCurrenciesSelector = createSelector(
  getAccountsMap,
  getAccountId,
  (accounts, id) => EntityMap.get(accounts, id).currencies || []
)

const getLinkedAccountCurrenciesSelector = createSelector(
  getAccountsMap,
  getLinkedAccountId,
  (accounts, id) => EntityMap.get(accounts, id).currencies || []
)

export const getCurrencyOptions = createSelector(
  getAccountCurrenciesSelector,
  currencies => currencies.map(arrayToOptions)
)

export const getLinkedCurrencyOptions = createSelector(
  getLinkedAccountCurrenciesSelector,
  currencies => currencies.map(arrayToOptions)
)

export const getCurrency = createSelector(
  formSelector,
  getAccountCurrenciesSelector,
  getBaseCurrency,
  (form, currencies, base) => {
    const defaultCurrency =
      currencies.length > 0
        ? currencies.includes(base) ? base : currencies[0]
        : ''
    if (!form.currency) return defaultCurrency

    return currencies.includes(form.currency) ? form.currency : defaultCurrency
  }
)

export const getLinkedCurrency = createSelector(
  formSelector,
  getLinkedAccountCurrenciesSelector,
  getBaseCurrency,
  (form, currencies, base) => {
    const defaultCurrency =
      currencies.length > 0
        ? currencies.includes(base) ? base : currencies[0]
        : ''
    if (!form.linkedCurrency) return defaultCurrency

    return currencies.includes(form.linkedCurrency)
      ? form.linkedCurrency
      : defaultCurrency
  }
)
