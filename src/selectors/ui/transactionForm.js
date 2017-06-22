import { createSelector } from 'reselect'

const formSelector = state => state.ui.transactionForm
const baseCurrencySelector = state => state.settings.currency.base
const defaultAccountSelector = state => state.accounts.allIds[0]
const accountsSelector = state => state.accounts.byId
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

export const getCurrencies = createSelector(
  getAccountId,
  accountsSelector,
  currenciesArray
)

export const getLinkedCurrencies = createSelector(
  getLinkedAccountId,
  accountsSelector,
  currenciesArray
)

export const getCurrency = createSelector(
  formSelector,
  getCurrencies,
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
  getLinkedCurrencies,
  baseCurrencySelector,
  (form, currencies, base) => {
    const defaultCurrency = currencies.length > 0
      ? currencies.includes(base) ? base : currencies[0].text
      : ''

    return form.linkedCurrency || defaultCurrency
  }
)

export const getTagOptions = createSelector(formSelector, form =>
  form.tagOptions.map(arrayToOptions)
)
