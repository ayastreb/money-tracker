import {
  TransationKindT,
  recentListLimit,
  defaultKind,
  getKindLabel,
  formToState,
  stateToForm,
  storageToState,
  stateToStorage
} from './Transaction';

const { Expense, Transfer, Income } = TransationKindT;

it('has default kind', () => {
  expect(defaultKind).toEqual(Expense);
});

it('has default recent transactions list limit', () => {
  expect(recentListLimit).toEqual(5);
});

it('returns kind label', () => {
  expect(getKindLabel(Expense)).toEqual('Expense');
  expect(getKindLabel(Transfer)).toEqual('Transfer');
  expect(getKindLabel(Income)).toEqual('Income');
});

it('converts transaction date to timestamp', () => {
  const form = {
    kind: Expense,
    accountId: 'A12345',
    amount: '9.95',
    currency: 'USD',
    tags: { [Expense]: ['food'] },
    date: '2017-09-20'
  };
  expect(formToState(form)).toEqual({
    id: '',
    kind: Expense,
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: ['food'],
    date: 1505865600000
  });
});

it('converts transaction date timestamp back to date in form', () => {
  const state = {
    id: 'T1505865600000-1234',
    kind: Expense,
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: ['food'],
    date: 1505865600000
  };
  expect(stateToForm(state)).toEqual({
    id: 'T1505865600000-1234',
    kind: Expense,
    accountId: 'A12345',
    amount: '9.95',
    currency: 'USD',
    tags: { [Expense]: ['food'], [Income]: [] },
    note: '',
    date: '2017-09-20'
  });
});

it('converts transaction amount to currency subunit', () => {
  const form = {
    kind: Income,
    id: 'T12345',
    accountId: 'A12345',
    amount: '9.95',
    currency: 'USD',
    tags: {},
    date: '2017-09-20'
  };
  expect(formToState(form)).toEqual({
    kind: Income,
    id: 'T12345',
    accountId: 'A12345',
    amount: 995,
    currency: 'USD',
    date: 1505865600000
  });
});

it('converts linked amount for transfer transaction to currency subunit', () => {
  const form = {
    kind: Transfer,
    id: 'T12345',
    accountId: 'A12345',
    amount: '1000',
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: '9.09',
    linkedCurrency: 'USD',
    tags: {},
    date: '2017-09-20'
  };
  expect(formToState(form)).toEqual({
    kind: Transfer,
    id: 'T12345',
    accountId: 'A12345',
    amount: 1000,
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: 909,
    linkedCurrency: 'USD',
    date: 1505865600000
  });
});

it('changes amount sign to negative for expense transaction', () => {
  const form = {
    kind: Expense,
    id: 'T12345',
    accountId: 'A12345',
    amount: '9.95',
    currency: 'USD',
    tags: {},
    date: '2017-09-20'
  };
  expect(formToState(form)).toEqual({
    kind: Expense,
    id: 'T12345',
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    date: 1505865600000
  });
});

it('changes amount back to float and reverses negative sign for expense', () => {
  const state = {
    kind: Expense,
    id: 'T12345',
    accountId: 'A12345',
    amount: -990,
    currency: 'USD',
    tags: ['food'],
    date: 1505865600000
  };
  expect(stateToForm(state)).toEqual({
    kind: Expense,
    id: 'T12345',
    accountId: 'A12345',
    amount: '9.9',
    currency: 'USD',
    note: '',
    tags: {
      [Expense]: ['food'],
      [Income]: []
    },
    date: '2017-09-20'
  });
});

it('changes amount back to float for transfer transaction', () => {
  const state = {
    kind: Transfer,
    id: 'T12345',
    accountId: 'A12345',
    amount: 1000,
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: 909,
    linkedCurrency: 'USD',
    tags: [],
    date: 1505865600000
  };
  expect(stateToForm(state)).toEqual({
    kind: Transfer,
    id: 'T12345',
    accountId: 'A12345',
    amount: '1000',
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: '9.09',
    linkedCurrency: 'USD',
    note: '',
    tags: {
      [Expense]: [],
      [Income]: [],
      [Transfer]: []
    },
    date: '2017-09-20'
  });
});

it('converts id, filters out unrelated fields from storage', () => {
  const storage = {
    _id: 'T1505865600000-12345',
    _rev: '1-abcd',
    _conflicts: [],
    kind: Expense,
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: []
  };
  expect(storageToState(storage)).toEqual({
    id: 'T1505865600000-12345',
    kind: Expense,
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: [],
    date: 1505865600000
  });
});

it('skips id from data when write to storage', () => {
  const state = {
    kind: Income,
    id: 'T12345',
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    tags: [],
    date: 1505865600000
  };
  expect(stateToStorage(state)).toEqual({
    kind: Income,
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    tags: []
  });
});

it('stores linked account only for transfer transaction', () => {
  const state = {
    kind: Transfer,
    id: 'T12345',
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    linkedAccountId: 'A12346',
    linkedAmount: 10000,
    linkedCurrency: 'JPY',
    tags: [],
    date: 1505865600000
  };
  expect(stateToStorage(state)).toEqual({
    kind: Transfer,
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    linkedAccountId: 'A12346',
    linkedAmount: 10000,
    linkedCurrency: 'JPY',
    tags: []
  });
});
