import format from 'date-fns/format';
import { getDefaultState } from './transaction';
import { defaultKind, TransationKindT } from '../../../entities/Transaction';
import EntityMap from '../../../entities/EntityMap';

const { Expense, Income } = TransationKindT;

it('returns default state for single account, single currency', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 199 },
          currencies: ['USD']
        }
      ])
    },
    settings: {
      currency: {
        base: 'USD'
      },
      exchangeRate: {
        USD: 1
      }
    }
  };
  const expectedDefault = {
    kind: defaultKind,
    isModalOpen: false,
    accountId: 'A12345',
    amount: '',
    currency: 'USD',
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tags: {
      [Expense]: [],
      [Income]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  };

  expect(getDefaultState(state)).toEqual(expectedDefault);
});

it('returns default state for single account, multiple currencies', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 199, JPY: 2000 },
          currencies: ['USD', 'JPY']
        }
      ])
    },
    settings: {
      currency: {
        base: 'USD'
      },
      exchangeRate: {
        USD: 1,
        JPY: 0.01
      }
    }
  };
  const expectedDefault = {
    kind: defaultKind,
    isModalOpen: false,
    accountId: 'A12345',
    amount: '',
    currency: 'USD',
    linkedAccountId: 'A12345',
    linkedAmount: '',
    linkedCurrency: 'JPY',
    tags: {
      [Expense]: [],
      [Income]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  };

  expect(getDefaultState(state)).toEqual(expectedDefault);
});

it('returns default state for multiple accounts', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        {
          id: 'A12345',
          name: '1.foo',
          group: 'cash',
          balance: { USD: 199, JPY: 2000 },
          currencies: ['USD', 'JPY']
        },
        {
          id: 'A12346',
          name: '2.bar',
          group: 'cash',
          balance: { EUR: 100 },
          currencies: ['EUR']
        }
      ])
    },
    settings: {
      currency: {
        base: 'JPY'
      },
      exchangeRate: {
        USD: 108,
        EUR: 126,
        JPY: 1
      }
    }
  };
  const expectedDefault = {
    kind: defaultKind,
    isModalOpen: false,
    accountId: 'A12345',
    amount: '',
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: '',
    linkedCurrency: 'EUR',
    tags: {
      [Expense]: [],
      [Income]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  };

  expect(getDefaultState(state)).toEqual(expectedDefault);
});
