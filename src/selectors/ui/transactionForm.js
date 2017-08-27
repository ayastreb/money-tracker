import { createSelector } from 'reselect'
import { EXPENSE, INCOME } from '../../models/Transaction'

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

const getAccountCurrenciesSelector = createSelector(
  getAccountId,
  accountsSelector,
  (accountId, accounts) => (accountId && accounts[accountId].currencies) || []
)

const getLinkedAccountCurrenciesSelector = createSelector(
  getLinkedAccountId,
  accountsSelector,
  (accountId, accounts) => (accountId && accounts[accountId].currencies) || []
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
  baseCurrencySelector,
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
  baseCurrencySelector,
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

export const getExpenseTagOptions = createSelector(tagsSelector, tags =>
  tags[EXPENSE].map(arrayToOptions)
)

export const getIncomeTagOptions = createSelector(tagsSelector, tags =>
  tags[INCOME].map(arrayToOptions)
)
