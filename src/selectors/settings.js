import Currency from '../entities/Currency'

export const getExchangeRate = state => state.settings.exchangeRate
export const getBaseCurrency = state => state.settings.currency.base
export const getBaseCurrencySymbol = state => {
  return Currency.symbol(state.settings.currency.base)
}
export const getSecondaryCurrency = state => state.settings.currency.secondary
export const getCollapsedSections = state => state.settings.collapsedSections
