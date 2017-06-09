import { createSelector } from 'reselect'

const accountsSelector = state => state.accounts.byId

export const getUsedCurrency = createSelector(accountsSelector, accounts => {
  const used = new Set()
  Object.keys(accounts).forEach(id => {
    Object.keys(accounts[id].balance).forEach(code => used.add(code))
  })
  return [...used]
})
