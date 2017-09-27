import { createSelector } from 'reselect'
import { getAccountsMap } from './accounts'
import Transaction from '../../entities/Transaction'
import EntityMap from '../../entities/EntityMap'

const recentTransactionsSelector = state => state.entities.transactions.recent
const filterTransactionsSelector = state => state.entities.transactions.filter
const filterPageSelector = state => state.ui.transaction.filter.page

export const getRecentTransactions = createSelector(
  recentTransactionsSelector,
  getAccountsMap,
  (transactions, accounts) =>
    EntityMap.map(
      transactions,
      tx => ({
        ...tx,
        accountName: EntityMap.get(accounts, tx.accountId).name,
        linkedAccountName: EntityMap.get(accounts, tx.linkedAccountId).name
      }),
      0,
      Transaction.recentListLimit
    )
)

export const getFilterTransactions = createSelector(
  filterTransactionsSelector,
  filterPageSelector,
  getAccountsMap,
  (transactions, page, accounts) =>
    EntityMap.map(
      transactions,
      tx => ({
        ...tx,
        accountName: EntityMap.get(accounts, tx.accountId).name,
        linkedAccountName: EntityMap.get(accounts, tx.linkedAccountId).name
      }),
      page * Transaction.rowsPerSearchPage,
      page * Transaction.rowsPerSearchPage + Transaction.rowsPerSearchPage
    )
)
