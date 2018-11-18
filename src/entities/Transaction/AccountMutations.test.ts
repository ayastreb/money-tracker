import getAccountsMutations from './AccountMutations';
import { TransationKindT } from 'entities/Transaction';

const { Expense, Transfer, Income } = TransationKindT;

describe('create new transaction', () => {
  it('decreases amount for new expense', () => {
    const prev = undefined;
    const next = {
      id: 'T1234',
      kind: Expense,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD',
      date: 1505865600000
    };
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      }
    ]);
  });

  it('increases amount for new income', () => {
    const prev = undefined;
    const next = {
      id: 'T1234',
      kind: Income,
      accountId: 'A12345',
      amount: 101,
      currency: 'USD',
      date: 1505865600000
    };
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 101,
        currency: 'USD'
      }
    ]);
  });

  it('decreases amount for new transfer source, increases for target', () => {
    const prev = undefined;
    const next = {
      id: 'T1234',
      kind: Transfer,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY',
      date: 1505865600000
    };
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1070,
        currency: 'JPY'
      }
    ]);
  });

  it('does not mutate when new transfer source and target are the same', () => {
    const prev = undefined;
    const next = {
      id: 'T1234',
      kind: Transfer,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12345',
      linkedAmount: 100,
      linkedCurrency: 'USD',
      date: 1505865600000
    };
    expect(getAccountsMutations(prev, next)).toEqual([]);
  });
});

describe('remove transaction', () => {
  it('increases amount for expense', () => {
    const prev = {
      id: 'T1234',
      kind: Expense,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD',
      date: 1505865600000
    };
    const next = undefined;
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      }
    ]);
  });

  it('decreases amount for income', () => {
    const prev = {
      id: 'T1234',
      kind: Income,
      accountId: 'A12345',
      amount: 101,
      currency: 'USD',
      date: 1505865600000
    };
    const next = undefined;
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -101,
        currency: 'USD'
      }
    ]);
  });

  it('increases amount for transfer source, decreases for target', () => {
    const prev = {
      id: 'T1234',
      kind: Transfer,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY',
      date: 1505865600000
    };
    const next = undefined;
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      }
    ]);
  });
});

describe('update transaction', () => {
  it('removes expense, creates expense', () => {
    const prev = {
      id: 'T1234',
      kind: Expense,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD',
      date: 1505865600000
    };
    const next = {
      id: 'T1235',
      kind: Expense,
      accountId: 'A12345',
      amount: -150,
      currency: 'USD',
      date: 1505865600000
    };
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12345',
        amount: -150,
        currency: 'USD'
      }
    ]);
  });

  it('removes transfer, creates transfer', () => {
    const prev = {
      id: 'T1234',
      kind: Transfer,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY',
      date: 1505865600000
    };
    const next = {
      id: 'T1235',
      kind: Transfer,
      accountId: 'A12345',
      amount: 150,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1500,
      linkedCurrency: 'JPY',
      date: 1505865600000
    };
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      },
      {
        accountId: 'A12345',
        amount: -150,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1500,
        currency: 'JPY'
      }
    ]);
  });
});
