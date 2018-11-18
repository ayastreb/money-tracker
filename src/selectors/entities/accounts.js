import { createSelector } from 'reselect';
import { getBaseCurrency, getExchangeRate } from '../settings';
import { getGroupName } from '../../entities/Account';
import Currency from '../../entities/Currency';
import EntityMap from '../../entities/EntityMap';
import sortByName from '../../util/sortByName';

export const getAccountsMap = state => state.entities.accounts;

export const getAccount = id =>
  createSelector(
    getAccountsMap,
    accounts => EntityMap.get(accounts, id)
  );

export const getAccountByName = name =>
  createSelector(
    getAccountsList,
    accounts => accounts.find(account => account.name === name)
  );

export const getAccountsList = state =>
  EntityMap.map(state.entities.accounts, account => ({ ...account })).sort(
    sortByName
  );

export const getVisibleAccountsList = createSelector(
  getAccountsList,
  accounts => accounts.filter(account => !account.archived)
);

export const getDashboardAccountsList = createSelector(
  getVisibleAccountsList,
  accounts => accounts.filter(account => account.on_dashboard)
);

export const getAccountsNameMap = createSelector(
  getAccountsList,
  accounts =>
    accounts.reduce((acc, account) => {
      acc[account.id] = account.name;
      return acc;
    }, {})
);

export const getAccountsCurrencyMap = createSelector(
  getAccountsList,
  accounts =>
    accounts.reduce((acc, account) => {
      acc[account.id] = account.currencies;
      return acc;
    }, {})
);

export const getAccountsCurrencyList = createSelector(
  getAccountsList,
  accounts =>
    accounts.reduce(
      (currencies, account) =>
        currencies.concat(
          account.currencies.filter(code => !currencies.includes(code))
        ),
      []
    )
);

const groupAccounts = (accounts, base, rate) => {
  const grouped = accounts.reduce((grouped, account) => {
    const group = account.group;
    if (!grouped[group]) {
      grouped[group] = {
        name: getGroupName(group),
        accounts: [],
        total: 0
      };
    }

    grouped[group].accounts.push(account);
    grouped[group].total += getBaseTotal(account, base, rate);

    return grouped;
  }, {});

  for (const group of Object.keys(grouped)) {
    grouped[group].accounts.sort(sortByName);
  }

  return grouped;
};

export const getVisibleGroupedAccounts = createSelector(
  getVisibleAccountsList,
  getBaseCurrency,
  getExchangeRate,
  groupAccounts
);

export const getDashboardGroupedAccounts = createSelector(
  getDashboardAccountsList,
  getBaseCurrency,
  getExchangeRate,
  groupAccounts
);

export const getGroupedAccounts = createSelector(
  getAccountsList,
  getBaseCurrency,
  getExchangeRate,
  groupAccounts
);

export const getAccountsAsOptions = createSelector(
  getVisibleGroupedAccounts,
  groups => {
    const options = [];
    for (const group of Object.keys(groups)) {
      for (const account of groups[group].accounts) {
        options.push({
          key: account.id,
          value: account.id,
          text: account.name,
          description: getGroupName(group)
        });
      }
    }
    return options;
  }
);

export const getNetWorth = createSelector(
  getAccountsList,
  getBaseCurrency,
  getExchangeRate,
  (accounts, base, rate) =>
    accounts.reduce(
      (netWorth, account) => netWorth + getBaseTotal(account, base, rate),
      0
    )
);

const getBaseTotal = (account, base, rate) =>
  account.currencies.reduce(
    (total, code) =>
      Math.floor(
        total + Currency.convert(account.balance[code], rate[code], base, code)
      ),
    0
  );
