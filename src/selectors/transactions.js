import { createSelector } from 'reselect'
import Transaction from '../models/Transaction'

const recentTransactionsSelector = state => state.transactions.recent.byId
const recentTransactionsIdsSelector = state => state.transactions.recent.allIds
const accountsIdsSelector = state => state.accounts.byId

export const getRecentTransactions = createSelector(
  recentTransactionsSelector,
  recentTransactionsIdsSelector,
  accountsIdsSelector,
  (byId, allIds, accounts) =>
    allIds.slice(0, Transaction.recentListLimit).map(id => ({
      ...byId[id],
      accountName:
        accounts[byId[id].accountId] && accounts[byId[id].accountId].name,
      linkedAccountName:
        byId[id].linkedAccountId && accounts[byId[id].linkedAccountId].name
    }))
)
