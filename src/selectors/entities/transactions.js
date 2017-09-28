import { createSelector } from 'reselect'
import { getAccountsMap } from './accounts'
import { getBaseCurrency, getExchangeRate } from '../settings'
import { getPage } from '../ui/transaction/filter'
import Transaction from '../../entities/Transaction'
import Currency from '../../entities/Currency'
import EntityMap from '../../entities/EntityMap'

const recentTransactionsSelector = state => state.entities.transactions.recent
const filterTransactionsSelector = state => state.entities.transactions.filter

export const getRecentTransactions = createSelector(
  recentTransactionsSelector,
  getAccountsMap,
  (transactions, accounts) =>
    EntityMap.map(
      transactions,
      transaction => joinAccountName(transaction, accounts),
      Transaction.recentListLimit
    )
)

export const getFilterTransactions = createSelector(
  filterTransactionsSelector,
  getPage,
  getAccountsMap,
  (transactions, page, accounts) =>
    EntityMap.map(
      transactions,
      transaction => joinAccountName(transaction, accounts),
      Transaction.rowsPerSearchPage,
      page * Transaction.rowsPerSearchPage
    )
)

function joinAccountName(transaction, accounts) {
  return {
    ...transaction,
    accountName: EntityMap.get(accounts, transaction.accountId).name,
    linkedAccountName: EntityMap.get(accounts, transaction.linkedAccountId).name
  }
}

export const getFilterTotal = kind =>
  createSelector(
    filterTransactionsSelector,
    getBaseCurrency,
    getExchangeRate,
    (transactions, base, rate) =>
      EntityMap.filter(transactions, tx => tx.kind === kind).reduce(
        (total, tx) =>
          Math.floor(
            total +
              Currency.convert(tx.amount, rate[tx.currency], base, tx.currency)
          ),
        0
      )
  )
