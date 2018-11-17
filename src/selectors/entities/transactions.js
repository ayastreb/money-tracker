import { createSelector } from 'reselect';
import { getAccountsMap } from './accounts';
import { getBaseCurrency, getExchangeRate } from '../settings';
import { getPage } from '../ui/transaction/filter';
import { recentListLimit, rowsPerSearchPage } from '../../entities/Transaction';
import Currency from '../../entities/Currency';
import EntityMap from '../../entities/EntityMap';

const recentTransactionsSelector = state => state.entities.transactions.recent;
const filterTransactionsSelector = state => state.entities.transactions.filter;

export const getRecentTransactions = createSelector(
  recentTransactionsSelector,
  getAccountsMap,
  (transactions, accounts) =>
    EntityMap.map(
      transactions,
      transaction => joinAccount(transaction, accounts),
      recentListLimit
    )
);

export const getFilterTransactions = createSelector(
  filterTransactionsSelector,
  getPage,
  getAccountsMap,
  (transactions, page, accounts) =>
    EntityMap.map(
      transactions,
      transaction => joinAccount(transaction, accounts),
      rowsPerSearchPage,
      page * rowsPerSearchPage
    )
);

function joinAccount(transaction, accounts) {
  const account = EntityMap.get(accounts, transaction.accountId);
  const linked = EntityMap.get(accounts, transaction.linkedAccountId);
  return {
    ...transaction,
    archived: account.archived || linked.archived,
    accountName: account.name,
    linkedAccountName: linked.name
  };
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
  );
