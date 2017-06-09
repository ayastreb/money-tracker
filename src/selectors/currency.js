import { createSelector } from 'reselect'

const accountsSelector = state => state.accounts.byId

export const getUsedCurrency = createSelector(accountsSelector, accounts =>
  Object.keys(accounts).reduce(
    (acc, id) =>
      acc.concat(
        Object.keys(accounts[id].balance).filter(code => !acc.includes(code))
      ),
    []
  )
)
