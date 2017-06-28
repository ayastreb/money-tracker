import { createSelector } from 'reselect'
import { EXPENSE, INCOME } from '../../constants/transaction'

const formSelector = state => state.ui.transactionForm
const baseCurrencySelector = state => state.settings.currency.base
const defaultAccountSelector = state => state.accounts.allIds[0]
const accountsSelector = state => state.accounts.byId
const tagsSelector = state => state.tags
const arrayToOptions = code => ({
  key: code,
  value: code,
  text: code
})

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

const currenciesArray = (accountId, accounts) =>
  (accountId && accounts[accountId].currencies.map(arrayToOptions)) || []

export const getCurrencyOptions = createSelector(
  getAccountId,
  accountsSelector,
  currenciesArray
)

export const getLinkedCurrencyOptions = createSelector(
  getLinkedAccountId,
  accountsSelector,
  currenciesArray
)

export const getCurrency = createSelector(
  formSelector,
  getCurrencyOptions,
  baseCurrencySelector,
  (form, currencies, base) => {
    const defaultCurrency = currencies.length > 0
      ? currencies.includes(base) ? base : currencies[0].text
      : ''

    return form.currency || defaultCurrency
  }
)

export const getLinkedCurrency = createSelector(
  formSelector,
  getLinkedCurrencyOptions,
  baseCurrencySelector,
  (form, currencies, base) => {
    const defaultCurrency = currencies.length > 0
      ? currencies.includes(base) ? base : currencies[0].text
      : ''

    return form.linkedCurrency || defaultCurrency
  }
)

export const getExpenseTagOptions = createSelector(tagsSelector, tags =>
  tags[EXPENSE].map(arrayToOptions)
)

export const getIncomeTagOptions = createSelector(tagsSelector, tags =>
  tags[INCOME].map(arrayToOptions)
)
