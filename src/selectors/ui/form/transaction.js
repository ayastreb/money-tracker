import format from 'date-fns/format';
import { createSelector } from 'reselect';
import {
  getAccountsCurrencyMap,
  getAccountsAsOptions
} from '../../entities/accounts';
import { getBaseCurrency } from '../../settings';
import { defaultKind, TransationKindT } from '../../../entities/Transaction';

const { Expense, Income } = TransationKindT;

export const getForm = state => state.ui.form.transaction;

const getDefaultAccountId = createSelector(
  getAccountsAsOptions,
  options => options.length > 0 && options[0].key
);

const getDefaultCurrency = createSelector(
  getDefaultAccountId,
  getAccountsCurrencyMap,
  getBaseCurrency,
  (accountId, currencies, base) =>
    accountId &&
    (currencies[accountId].includes(base) ? base : currencies[accountId][0])
);

const getDefaultLinkedAccountId = createSelector(
  getAccountsAsOptions,
  getDefaultAccountId,
  getAccountsCurrencyMap,
  (options, defaultAccountId, currencies) =>
    options.length > 1
      ? options[1].key
      : defaultAccountId &&
        currencies[defaultAccountId].length > 1 &&
        defaultAccountId
);

const getDefaultLinkedCurrency = createSelector(
  getDefaultAccountId,
  getDefaultLinkedAccountId,
  getAccountsCurrencyMap,
  getBaseCurrency,
  (accountId, linkedAccountId, currencies, base) =>
    accountId && accountId === linkedAccountId
      ? currencies[accountId][1]
      : linkedAccountId &&
        (currencies[linkedAccountId].includes(base)
          ? base
          : currencies[linkedAccountId][0])
);

export const getDefaultState = createSelector(
  getDefaultAccountId,
  getDefaultCurrency,
  getDefaultLinkedAccountId,
  getDefaultLinkedCurrency,
  (accountId, currency, linkedAccountId, linkedCurrency) => {
    return {
      kind: defaultKind,
      isModalOpen: false,
      accountId: accountId || null,
      currency: currency || null,
      amount: '',
      linkedAccountId: linkedAccountId || null,
      linkedCurrency: linkedCurrency || null,
      linkedAmount: '',
      tags: {
        [Expense]: [],
        [Income]: []
      },
      date: format(new Date(), 'YYYY-MM-DD'),
      note: ''
    };
  }
);
