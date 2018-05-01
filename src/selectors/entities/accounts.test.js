import {
  getAccountsMap,
  getAccountsList,
  getAccountByName,
  getDashboardAccountsList,
  getAccountsCurrencyMap,
  getAccountsCurrencyList,
  getAccountsAsOptions,
  getDashboardGroupedAccounts,
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
        balance: { USD: 100, EUR: 200 },
        currencies: ['USD', 'EUR'],
        on_dashboard: true
      },
      {
        id: 'A12346',
        name: 'bar',
        group: 'cash',
        balance: { JPY: 1000 },
        currencies: ['JPY'],
        on_dashboard: false
      },
      {
        id: 'A12347',
        name: 'baz',
        group: 'bank',
        balance: { USD: 200, JPY: 100 },
        currencies: ['USD', 'JPY'],
        on_dashboard: false
      }
    ])
  }
}

it('gets account by name', () => {
  expect(getAccountByName('baz')(state)).toEqual({
    id: 'A12347',
    name: 'baz',
    group: 'bank',
    balance: { USD: 200, JPY: 100 },
    currencies: ['USD', 'JPY'],
    on_dashboard: false
  })
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
  const expectedCurrencyList = ['JPY', 'USD', 'EUR']
  expect(getAccountsCurrencyList(state)).toEqual(expectedCurrencyList)
})

it('gets accounts as dropdown options list', () => {
  const expectedOptions = [
    {
      key: 'A12346',
      value: 'A12346',
      text: 'bar',
      description: 'Cash'
    },
    {
      key: 'A12345',
      value: 'A12345',
      text: 'foo',
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

it('get grouped accounts map for dashboard', () => {
  const expectedGroups = {
    cash: {
      name: 'Cash',
      total: 366, // => $3.66
      accounts: [
        {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 100, EUR: 200 }, // => $1 + $2.66 => $3.66
          currencies: ['USD', 'EUR'],
          on_dashboard: true
        }
      ]
    }
  }
  expect(getDashboardGroupedAccounts(state)).toEqual(expectedGroups)
})

it('get grouped accounts map with calculated base total', () => {
  const expectedGroups = {
    cash: {
      name: 'Cash',
      total: 1275, // => $3.66 + $9.09
      accounts: [
        {
          id: 'A12346',
          name: 'bar',
          group: 'cash',
          balance: { JPY: 1000 }, // => $9.09
          currencies: ['JPY'],
          on_dashboard: false
        },
        {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 100, EUR: 200 }, // => $1 + $2.66 => $3.66
          currencies: ['USD', 'EUR'],
          on_dashboard: true
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
          currencies: ['USD', 'JPY'],
          on_dashboard: false
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
