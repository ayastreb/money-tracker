import { createSelector } from 'reselect'
import { getAccountsMap } from './accounts'
import Transaction from '../entities/Transaction'
import EntityMap from '../entities/EntityMap'

const recentTransactionsSelector = state => state.entities.transactions.recent

export const getRecentTransactions = createSelector(
  recentTransactionsSelector,
  getAccountsMap,
  (transactions, accounts) =>
    EntityMap.map(transactions, tx => ({
      ...tx,
      accountName: EntityMap.get(accounts, tx.accountId).name,
      linkedAccountName: EntityMap.get(accounts, tx.linkedAccountId).name
    })).slice(0, Transaction.recentListLimit)
)
