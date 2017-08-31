import { createSelector } from 'reselect'

const accountsSelector = state => state.accounts.byId
const accountsIdsSelector = state => state.accounts.allIds

export const getBaseCurrency = state => state.settings.currency.base
export const getSecondaryCurrency = state => state.settings.currency.secondary
export const getUsedCurrency = createSelector(
  accountsIdsSelector,
  accountsSelector,
  (accountsIds, accounts) => {
    const used = new Set()
    accountsIds.forEach(id => {
      accounts[id].currencies.forEach(code => used.add(code))
    })
    return [...used]
  }
)
