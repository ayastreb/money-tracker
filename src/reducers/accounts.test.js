import reducer from './accounts'
import {
  loadAccountsSuccess,
  saveAccountRequest,
  saveAccountFailure,
  removeAccountRequest,
  changeBalanceRequest
} from '../actions/accounts'
import Account from '../models/Account'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({ byId: {}, allIds: [] })
})

describe('loading accounts', () => {
  it('loads accounts', () => {
    expect(
      reducer(
        undefined,
        loadAccountsSuccess([
          new Account({ id: 'A12345', name: 'foo', balance: { USD: 100 } }),
          new Account({
            id: 'A12346',
            name: 'bar',
            balance: { EUR: 10, JPY: 15 }
          })
        ])
      )
    ).toEqual({
      byId: {
        A12345: {
          id: 'A12345',
          name: 'foo',
          balance: { USD: 100 },
          currencies: ['USD']
        },
        A12346: {
          id: 'A12346',
          name: 'bar',
          balance: { EUR: 10, JPY: 15 },
          currencies: ['EUR', 'JPY']
        }
      },
      allIds: ['A12345', 'A12346']
    })
  })
})

describe('saving account', () => {
  it('adds account to the list', () => {
    expect(
      reducer(
        undefined,
        saveAccountRequest(
          new Account({
            id: 'A12345',
            name: 'foo',
            group: 'cash',
            balance: { USD: 12500 }
          })
        )
      )
    ).toEqual({
      byId: {
        A12345: {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 },
          currencies: ['USD']
        }
      },
      allIds: ['A12345']
    })

    expect(
      reducer(
        {
          byId: {
            A12345: {
              id: 'A12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 },
              currencies: ['USD']
            }
          },
          allIds: ['A12345']
        },
        saveAccountRequest(
          new Account({
            id: 'A12346',
            name: 'bar',
            group: 'bank',
            balance: { EUR: 205 }
          })
        )
      )
    ).toEqual({
      byId: {
        A12345: {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 },
          currencies: ['USD']
        },
        A12346: {
          id: 'A12346',
          name: 'bar',
          group: 'bank',
          balance: { EUR: 205 },
          currencies: ['EUR']
        }
      },
      allIds: ['A12345', 'A12346']
    })
  })

  it('removes account from state when failed to persist', () => {
    expect(
      reducer(
        {
          byId: {
            A12345: {
              id: 'A12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 },
              currencies: ['USD']
            },
            A12346: {
              id: 'A12346',
              name: 'bar',
              group: 'bank',
              balance: { USD: 205 },
              currencies: ['USD']
            }
          },
          allIds: ['A12345', 'A12346']
        },
        saveAccountFailure('A12345')
      )
    ).toEqual({
      byId: {
        A12346: {
          id: 'A12346',
          name: 'bar',
          group: 'bank',
          balance: { USD: 205 },
          currencies: ['USD']
        }
      },
      allIds: ['A12346']
    })
  })
})

describe('removing account', () => {
  it('removes account', () => {
    expect(
      reducer(
        {
          byId: {
            A12345: {
              id: 'A12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 }
            },
            A12346: {
              id: 'A12346',
              name: 'bar',
              group: 'bank',
              balance: { USD: 205 }
            }
          },
          allIds: ['A12345', 'A12346']
        },
        removeAccountRequest('A12346')
      )
    ).toEqual({
      byId: {
        A12345: {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 }
        }
      },
      allIds: ['A12345']
    })
  })
})

describe('changing balance', () => {
  it('decreases balance', () => {
    expect(
      reducer(
        {
          byId: {
            A12345: {
              id: 'A12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 }
            },
            A12346: {
              id: 'A12346',
              name: 'bar',
              group: 'bank',
              balance: { USD: 205, JPY: 1200 }
            }
          },
          allIds: ['A12345', 'A12346']
        },
        changeBalanceRequest('A12346', 'JPY', -200)
      )
    ).toEqual({
      byId: {
        A12345: {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 }
        },
        A12346: {
          id: 'A12346',
          name: 'bar',
          group: 'bank',
          balance: { USD: 205, JPY: 1000 }
        }
      },
      allIds: ['A12345', 'A12346']
    })
  })

  it('increases balance', () => {
    expect(
      reducer(
        {
          byId: {
            A12345: {
              id: 'A12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 }
            },
            A12346: {
              id: 'A12346',
              name: 'bar',
              group: 'bank',
              balance: { USD: 205, JPY: 1200 }
            }
          },
          allIds: ['A12345', 'A12346']
        },
        changeBalanceRequest('A12346', 'USD', 100)
      )
    ).toEqual({
      byId: {
        A12345: {
          id: 'A12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 }
        },
        A12346: {
          id: 'A12346',
          name: 'bar',
          group: 'bank',
          balance: { USD: 305, JPY: 1200 }
        }
      },
      allIds: ['A12345', 'A12346']
    })
  })
})
