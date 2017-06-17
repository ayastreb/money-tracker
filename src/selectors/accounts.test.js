import { getGroupedAccounts, getNetWorth } from './accounts'

it('groups accounts', () => {
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
    accounts: {
      byId: {
        'A/12345': {
          group: 'cash',
          name: 'foo',
          balance: {
            USD: 10000,
            JPY: 110
          }
        },
        'A/12346': {
          group: 'bank',
          name: 'bar',
          balance: {
            JPY: 110 // = $1.00
          }
        },
        'A/12347': {
          group: 'bank',
          name: 'baz',
          balance: {
            EUR: 7500 // = $100.00
          }
        },
        'A/12348': {
          group: 'cash',
          name: 'bad',
          balance: {
            USD: 5000
          }
        }
      }
    }
  }
  expect(getGroupedAccounts(state)).toEqual({
    cash: {
      name: 'Cash',
      accounts: [
        {
          group: 'cash',
          name: 'foo',
          balance: {
            USD: 10000,
            JPY: 110
          }
        },
        {
          group: 'cash',
          name: 'bad',
          balance: {
            USD: 5000
          }
        }
      ],
      total: 15100
    },
    bank: {
      name: 'Bank',
      accounts: [
        {
          group: 'bank',
          name: 'bar',
          balance: {
            JPY: 110
          }
        },
        {
          group: 'bank',
          name: 'baz',
          balance: {
            EUR: 7500
          }
        }
      ],
      total: 10100
    }
  })
})

it('calculates net worth', () => {
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
    accounts: {
      byId: {
        'A/12345': {
          group: 'cash',
          name: 'foo',
          balance: {
            USD: 10000,
            JPY: 110
          }
        },
        'A/12346': {
          group: 'bank',
          name: 'bar',
          balance: {
            JPY: 110 // = $1.00
          }
        },
        'A/12347': {
          group: 'bank',
          name: 'baz',
          balance: {
            EUR: 7500 // = $100.00
          }
        },
        'A/12348': {
          group: 'cash',
          name: 'bad',
          balance: {
            USD: 5000
          }
        }
      }
    }
  }

  expect(getNetWorth(state)).toEqual(25200)
})
