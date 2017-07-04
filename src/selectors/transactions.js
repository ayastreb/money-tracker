import { createSelector } from 'reselect'
import { RECENT_TRANSACTIONS_LIMIT } from '../constants/transaction'

const recentTransactionsSelector = state => state.transactions.recent.byId
const recentTransactionsIdsSelector = state => state.transactions.recent.allIds
const accountsIdsSelector = state => state.accounts.byId

export const getRecentTransactions = createSelector(
  recentTransactionsSelector,
  recentTransactionsIdsSelector,
  accountsIdsSelector,
  (byId, allIds, accounts) =>
    allIds.slice(0, RECENT_TRANSACTIONS_LIMIT).map(id => ({
      ...byId[id],
      accountName: accounts[byId[id].accountId].name,
      linkedAccountName: byId[id].linkedAccountId &&
        accounts[byId[id].linkedAccountId].name
    }))
)
