import reducer from './'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT
} from '../../actions/accounts'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({ byId: {}, allIds: [] })
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
          balance: { USD: 12500 }
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
              balance: { USD: 12500 }
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
            balance: { USD: 205 }
          }
        }
      )
    ).toEqual({
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
          balance: { USD: 205 }
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
