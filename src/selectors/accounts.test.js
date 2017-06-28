import {
  getAccountsAsOptions,
  getGroupedAccounts,
  getNetWorth
} from './accounts'

it('returns accounts list as dropdown options', () => {
  const state = {
    accounts: {
      allIds: ['A12345', 'A12346'],
      byId: {
        A12345: {
          group: 'cash',
          name: 'foo'
        },
        A12346: {
          group: 'bank',
          name: 'bar'
        }
      }
    }
  }

  expect(getAccountsAsOptions(state)).toEqual([
    {
      key: 'A12345',
      value: 'A12345',
      text: 'foo'
    },
    {
      key: 'A12346',
      value: 'A12346',
      text: 'bar'
    }
  ])
})

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
      allIds: ['A12345', 'A12346', 'A12347', 'A12348'],
      byId: {
        A12345: {
          group: 'cash',
          name: 'foo',
          currencies: ['USD', 'JPY'],
          balance: {
            USD: 10000,
            JPY: 110
          }
        },
        A12346: {
          group: 'bank',
          name: 'bar',
          currencies: ['JPY'],
          balance: {
            JPY: 110 // = $1.00
          }
        },
        A12347: {
          group: 'bank',
          name: 'baz',
          currencies: ['EUR'],
          balance: {
            EUR: 7500
          }
        },
        A12348: {
          group: 'cash',
          name: 'bad',
          currencies: ['USD'],
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
          currencies: ['USD', 'JPY'],
          balance: {
            USD: 10000,
            JPY: 110
          }
        },
        {
          group: 'cash',
          name: 'bad',
          currencies: ['USD'],
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
          currencies: ['JPY'],
          balance: {
            JPY: 110
          }
        },
        {
          group: 'bank',
          name: 'baz',
          currencies: ['EUR'],
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
      allIds: ['A12345', 'A12346', 'A12347', 'A12348'],
      byId: {
        A12345: {
          group: 'cash',
          name: 'foo',
          currencies: ['USD', 'JPY'],
          balance: {
            USD: 10000,
            JPY: 110
          }
        },
        A12346: {
          group: 'bank',
          name: 'bar',
          currencies: ['JPY'],
          balance: {
            JPY: 110 // = $1.00
          }
        },
        A12347: {
          group: 'bank',
          name: 'baz',
          currencies: ['EUR'],
          balance: {
            EUR: 7500
          }
        },
        A12348: {
          group: 'cash',
          name: 'bad',
          currencies: ['USD'],
          balance: {
            USD: 5000
          }
        }
      }
    }
  }

  expect(getNetWorth(state)).toEqual(25200)
})
