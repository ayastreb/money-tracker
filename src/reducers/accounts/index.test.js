import reducer from './'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  LOAD_ACCOUNTS_SUCCESS,
  REMOVE_ACCOUNT
} from '../../actions/accounts'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({ byId: {}, allIds: [] })
})

describe('loading accounts', () => {
  it('loads accounts', () => {
    expect(
      reducer(undefined, {
        type: LOAD_ACCOUNTS_SUCCESS,
        accounts: [
          { id: 'A/12345', name: 'foo', balance: { USD: 100 } },
          { id: 'A/12346', name: 'bar', balance: { EUR: 10, JPY: 15 } }
        ]
      })
    ).toEqual({
      byId: {
        'A/12345': {
          id: 'A/12345',
          name: 'foo',
          balance: { USD: 100 },
          currencies: ['USD']
        },
        'A/12346': {
          id: 'A/12346',
          name: 'bar',
          balance: { EUR: 10, JPY: 15 },
          currencies: ['EUR', 'JPY']
        }
      },
      allIds: ['A/12345', 'A/12346']
    })
  })
})

describe('creating account', () => {
  it('creates account', () => {
    expect(
      reducer(undefined, {
        type: CREATE_ACCOUNT,
        account: {
          id: 'A/12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 }
        }
      })
    ).toEqual({
      byId: {
        'A/12345': {
          id: 'A/12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 },
          currencies: ['USD']
        }
      },
      allIds: ['A/12345']
    })

    expect(
      reducer(
        {
          byId: {
            'A/12345': {
              id: 'A/12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 },
              currencies: ['USD']
            }
          },
          allIds: ['A/12345']
        },
        {
          type: CREATE_ACCOUNT,
          account: {
            id: 'A/12346',
            name: 'bar',
            group: 'bank',
            balance: { EUR: 205 }
          }
        }
      )
    ).toEqual({
      byId: {
        'A/12345': {
          id: 'A/12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 },
          currencies: ['USD']
        },
        'A/12346': {
          id: 'A/12346',
          name: 'bar',
          group: 'bank',
          balance: { EUR: 205 },
          currencies: ['EUR']
        }
      },
      allIds: ['A/12345', 'A/12346']
    })
  })

  it('removes account from state when failed to persist', () => {
    expect(
      reducer(
        {
          byId: {
            'A/12345': {
              id: 'A/12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 },
              currencies: ['USD']
            },
            'A/12346': {
              id: 'A/12346',
              name: 'bar',
              group: 'bank',
              balance: { USD: 205 },
              currencies: ['USD']
            }
          },
          allIds: ['A/12345', 'A/12346']
        },
        {
          type: CREATE_ACCOUNT_FAILURE,
          id: 'A/12345'
        }
      )
    ).toEqual({
      byId: {
        'A/12346': {
          id: 'A/12346',
          name: 'bar',
          group: 'bank',
          balance: { USD: 205 },
          currencies: ['USD']
        }
      },
      allIds: ['A/12346']
    })
  })
})

describe('removing account', () => {
  it('removes account', () => {
    expect(
      reducer(
        {
          byId: {
            'A/12345': {
              id: 'A/12345',
              name: 'foo',
              group: 'cash',
              balance: { USD: 12500 }
            },
            'A/12346': {
              id: 'A/12346',
              name: 'bar',
              group: 'bank',
              balance: { USD: 205 }
            }
          },
          allIds: ['A/12345', 'A/12346']
        },
        {
          type: REMOVE_ACCOUNT,
          id: 'A/12346'
        }
      )
    ).toEqual({
      byId: {
        'A/12345': {
          id: 'A/12345',
          name: 'foo',
          group: 'cash',
          balance: { USD: 12500 }
        }
      },
      allIds: ['A/12345']
    })
  })
})
