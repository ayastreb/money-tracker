import { createSelector } from 'reselect'

const accountsSelector = state => state.accounts.byId
const accountsIdsSelector = state => state.accounts.allIds

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
