import {
  getAccountsMap,
  getAccountsList,
  getAccountsCurrencyMap,
  getAccountsCurrencyList,
  getAccountsAsOptions,
  getGroupedAccounts,
  getNetWorth
} from './accounts'
import EntityMap from '../../entities/EntityMap'

const state = {
  settings: {
    currency: {
      base: 'USD'
    },
    exchangeRate: {
      USD: 1,
      JPY: 110,
      EUR: 0.75
    }
  },
  entities: {
    accounts: EntityMap.fromArray([
      {
        id: 'A12345',
        name: 'foo',
        group: 'cash',
        balance: { USD: 100, EUR: 200 }
      },
      { id: 'A12346', name: 'bar', group: 'cash', balance: { JPY: 1000 } },
      {
        id: 'A12347',
        name: 'baz',
        group: 'bank',
        balance: { USD: 200, JPY: 100 }
      }
    ])
  }
}

it('adds currencies list to accounts map', () => {
  const expectedAccount = {
    id: 'A12345',
    name: 'foo',
    group: 'cash',
    balance: { USD: 100, EUR: 200 },
    currencies: ['USD', 'EUR']
  }
  const account = EntityMap.get(getAccountsMap(state), 'A12345')
  expect(account).toEqual(expectedAccount)
})

it('adds currencies list to account list', () => {
  const expectedAccount = {
    id: 'A12345',
    name: 'foo',
    group: 'cash',
    balance: { USD: 100, EUR: 200 },
    currencies: ['USD', 'EUR']
  }
  const account = getAccountsList(state).find(acc => acc.id === 'A12345')
  expect(account).toEqual(expectedAccount)
})

it('gets accounts currency map', () => {
  const expectedCurrencyMap = {
    A12345: ['USD', 'EUR'],
    A12346: ['JPY'],
    A12347: ['USD', 'JPY']
  }
  expect(getAccountsCurrencyMap(state)).toEqual(expectedCurrencyMap)
})

it('gets list of used currencies', () => {
  const expectedCurrencyList = ['USD', 'EUR', 'JPY']
  expect(getAccountsCurrencyList(state)).toEqual(expectedCurrencyList)
})

it('gets accounts as dropdown options list', () => {
  const expectedOptions = [
    {
      key: 'A12345',
      value: 'A12345',
      text: 'foo',
      description: 'Cash'
    },
    {
      key: 'A12346',
      value: 'A12346',
      text: 'bar',
      description: 'Cash'
    },
    {
      key: 'A12347',
      value: 'A12347',
      text: 'baz',
      description: 'Bank Account'
    }
  ]
  expect(getAccountsAsOptions(state)).toEqual(expectedOptions)
})

it('get grouped accounts map with calculated base total', () => {
  const expectedGroups = {
    cash: {
      name: 'Cash',
      total: 1275, // => $3.66 + $9.09
      accounts: [
        {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 100, EUR: 200 }, // => $1 + $2.66 => $3.66
          currencies: ['USD', 'EUR']
        },
        {
          id: 'A12346',
          name: 'bar',
          group: 'cash',
          balance: { JPY: 1000 }, // => $9.09
          currencies: ['JPY']
        }
      ]
    },
    bank: {
      name: 'Bank Account',
      total: 290, // => $2.90
      accounts: [
        {
          id: 'A12347',
          name: 'baz',
          group: 'bank',
          balance: { USD: 200, JPY: 100 },
          currencies: ['USD', 'JPY']
        }
      ]
    }
  }
  expect(getGroupedAccounts(state)).toEqual(expectedGroups)
})

it('calculates net worth = sum of all accounts base total', () => {
  const expectedNetWorth = 1565 // $12.75 + $2.90
  expect(getNetWorth(state)).toEqual(expectedNetWorth)
})
